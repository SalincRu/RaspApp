<template>
  <v-ons-page>
    <template v-if="!offline">
      <div style="margin: 10px;">
        <v-ons-search-input v-model="search" style="width: 100%;" placeholder="Поиск группы"></v-ons-search-input>
      </div>
      <v-ons-list>
        <v-ons-list-item
          v-for="group in groupsList"
          :key="group"
          @click="openGroup(group)"
          modifier="chevron"
          tappable
        >{{group}}</v-ons-list-item>
      </v-ons-list>
    </template>
    <div v-else style="margin: 10px; text-align:center">Просмотр групп недоступен без интернета</div>
  </v-ons-page>
</template>

<script>
import ViewGroupPage from "./ViewGroupPage";

export default {
  name: "GroupsPage",
  data: () => ({
    groups: {
      last_update: "Нет",
      groups: []
    },
    search: "",
    offline: false
  }),
  methods: {
    openGroup(name) {
      this.$store.commit("PUSH_PAGE", {
        extends: ViewGroupPage,
        onsNavigatorProps: {
          groupName: name
        }
      });
    }
  },
  mounted() {
    fetch("/api.php?method=groups")
      .then(response => response.json())
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