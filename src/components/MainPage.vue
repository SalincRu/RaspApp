<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="center">Расписание СИК</div>
      <div class="right">
        <v-ons-toolbar-button>
          <v-ons-icon @click="openSettings" icon="mdi-settings"></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
    </v-ons-toolbar>

    <v-ons-tabbar swipeable position="auto" :visible="true" :tabs="tabs"></v-ons-tabbar>
  </v-ons-page>
</template>

<script>
import HomePage from "./HomePage";
import GroupsPage from "./GroupsPage";
import RingsPage from "./RingsPage";
import SettingsPage from "./SettingsPage";

export default {
  name: "MainPage",
  data: () => ({}),
  computed: {
    tabs() {
      return [
        {
          label: "Главная",
          icon: this.md() ? null : "mdi-home",
          page: HomePage
        },
        {
          label: "Группы",
          icon: this.md() ? null : "mdi-account-group",
          page: GroupsPage
        },
        {
          label: "Звонки",
          icon: this.md() ? null : "mdi-bell-outline",
          page: RingsPage
        }
      ];
    }
  },
  methods: {
    md() {
      return this.$ons.platform.isAndroid();
    },
    openSettings() {
      this.$store.commit("PUSH_PAGE", SettingsPage);
    }
  }
};
</script>
