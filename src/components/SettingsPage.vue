<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="center">Настройки</div>
      <div class="left">
        <v-ons-back-button>Назад</v-ons-back-button>
      </div>
    </v-ons-toolbar>

    <v-ons-list>
      <v-ons-list-header>Расписание</v-ons-list-header>
      <v-ons-list-item @click="openGroupsPage" modifier="chevron" tappable>Сменить группу</v-ons-list-item>
      <!-- <v-ons-list-item tappable>Режим преподавателя</v-ons-list-item> -->
      <v-ons-list-item @click="resetSettings" tappable>Сброс настроек</v-ons-list-item>
      <v-ons-list-header>Приложение</v-ons-list-header>
      <v-ons-list-item
        @click="installPWA"
        v-if="installEvent !== null"
        modifier="chevron"
        tappable
      >Установить</v-ons-list-item>
      <v-ons-list-item @click="openAboutPage" modifier="chevron" tappable>О программе</v-ons-list-item>
    </v-ons-list>
    <div class="bottom">Версия приложения {{ver.version}} от {{ver.date}}</div>
  </v-ons-page>
</template>

<script>
import AboutPage from "./AboutPage";
import SettingsGroupPage from "./SettingsGroupPage";
import clog from "../changelog";

export default {
  name: "SettingsPage",
  data: () => ({
    installEvent: null,
    ver: clog[0]
  }),
  methods: {
    openAboutPage() {
      this.$store.commit("PUSH_PAGE", AboutPage);
    },
    openGroupsPage() {
      this.$store.commit("PUSH_PAGE", SettingsGroupPage);
    },
    resetSettings() {
      this.$ons.notification
        .confirm("Вы действительно хотите сбросить настройки приложения?", {
          title: "Сброс настроек",
          buttonLabels: ["Отмена", "Да"]
        })
        .then(response => {
          if (response === 1) {
            this.$store.dispatch("resetSettings");
          }
        });
    },
    installPWA() {
      this.installEvent.prompt();
    }
  },
  mounted() {
    this.installEvent = this.$store.getters.INSTALL_EVENT;
  }
};
</script>

<style lang="scss">
.bottom {
  margin-top: 5px;
  font-size: 0.75em;
  text-align: center;
  color: #999;
}
</style>