<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="center">Выбор группы</div>
      <div class="left">
        <v-ons-back-button>Назад</v-ons-back-button>
      </div>
    </v-ons-toolbar>
    <template v-if="!offline">
      <div style="margin: 10px;">
        <v-ons-search-input v-model="search" style="width: 100%;" placeholder="Поиск группы"></v-ons-search-input>
      </div>
      <v-ons-list>
        <v-ons-list-item
          v-for="group in groupsList"
          :key="group"
          @click="selectGroup(group)"
          tappable
        >{{group}}</v-ons-list-item>
      </v-ons-list>
    </template>
    <div v-else style="margin: 10px; text-align:center">Просмотр групп недоступен без интернета</div>
  </v-ons-page>
</template>

<script>
import ViewGroupPage from "./ViewGroupPage";
import { fetchGroups } from "../raspFetcher";

export default {
  name: "GroupsPage",
  data: () => ({
    groups: {
      last_update: "Загрузка...",
      groups: []
    },
    search: "",
    offline: false
  }),
  methods: {
    selectGroup(name) {
      this.$ons.notification
        .confirm(`Вы точно хотите сделать группу ${name} основной?`, {
          title: "Установить группу",
          buttonLabels: ["Отмена", "Да"]
        })
        .then(response => {
          if (response === 1) {
            this.$store.commit("SET_LAST_RASP", {
              last_update: "Нет",
              group: name,
              rasp: []
            });
            this.$store.commit("SET_GROUP", name);
            this.$ons.notification.alert(
              `Группа ${name} установлена в качестве основной.`,
              {
                title: "Группа установлена"
              }
            );
          }
        });
    }
  },
  mounted() {
    fetchGroups()
      .then(response => (this.groups = response))
      .catch(error => {
        this.offline = true;
      });
  },
  computed: {
    groupsList() {
      // return this.groups.groups.sort().filter(g => g.toLowerCase().includes(this.filter));
      let sorted = this.groups.groups.sort();
      if (this.search) {
        sorted = sorted.filter(m =>
          m.toLowerCase().includes(this.search.toLowerCase())
        );
      }
      return sorted;
    }
  }
};
</script>