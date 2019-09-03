<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left">
        <v-ons-back-button>Назад</v-ons-back-button>
      </div>
      <div class="center">Расписание {{groupName}}</div>
    </v-ons-toolbar>

    <div>
      <v-ons-list style="margin-bottom: 10px" v-for="rasp in groupData.rasp" :key="rasp.date">
        <v-ons-list-header>{{rasp.date}}</v-ons-list-header>
        <v-ons-list-item v-for="lesson in rasp.lessons" :key="lesson.num">
          <div class="center">
            <span class="list-item__title">{{lesson.num}} пара</span>
            <span class="list-item__subtitle">{{lesson.name}}</span>
          </div>
          <div class="right">{{lesson.cab}}</div>
        </v-ons-list-item>
      </v-ons-list>
      <div v-if="defaultGroup === null" style="padding: 0 10px 0 10px">
        <v-ons-button modifier="large" @click="setGroupAsDefault">Установить как основную группу</v-ons-button>
      </div>
      <div class="last_update">Последнее обновление: {{groupData.last_update}}</div>
    </div>
  </v-ons-page>
</template>

<style lang="scss">
.last_update {
  margin-top: 5px;
  text-align: center;
  font-size: 0.75em;
  color: #999;
}
</style>

<script>
import { request } from 'http';
export default {
  name: "ViewGroupPage",
  data: () => ({
    groupData: {
      last_update: "Загрузка...",
      group: "",
      rasp: []
    },
    defaultGroup: ""
  }),
  props: {
    groupName: {
      type: String,
      required: true
    }
  },
  methods: {
    setGroupAsDefault() {
      this.$ons.notification
        .confirm(
          `Вы точно хотите сделать группу ${this.groupData.group} основной?`,
          {
            title: "Установить группу",
            buttonLabels: ["Отмена", "Да"]
          }
        )
        .then(response => {
          if (response === 1) {
            this.$store.commit("SET_LAST_RASP", this.groupData);
            this.$store.commit("SET_GROUP", this.groupData.group);
            this.defaultGroup = this.groupData.group;
            this.$ons.notification.alert(
              `Группа ${this.groupData.group} установлена в качестве основной.\n\nПоменять основную группу можно в настройках.`,
              {
                title: "Группа установлена"
              }
            );
          }
        });
    }
  },
  mounted() {
    this.defaultGroup = this.$store.getters.SETTINGS.group;
    fetch("/api.php?method=rasp&type=group&group=" + this.groupName)
      .then(request => request.json())
      .then(request => this.groupData = request);
  }
};
</script>