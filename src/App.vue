<template>
  <v-ons-navigator swipeable :page-stack="pageStack"></v-ons-navigator>
</template>

<script>
import MainPage from "./components/MainPage";

export default {
  data: () => ({
    pageStack: [MainPage]
  }),
  mounted() {
    window.addEventListener("beforeinstallprompt", e => {
      e.preventDefault();
      this.$store.commit("SET_INSTALL_EVENT", e);
      this.$ons.notification
        .confirm(`Хотите установить приложение на телефон?`, {
          title: "Установка приложения",
          buttonLabels: ["Отмена", "Да"]
        })
        .then(response => {
          if (response === 1) {
            e.prompt();
          }
        });
    });
  },
  created() {
    this.PAGE_STACK = this.$store.getters.PAGE_STACK;
    this.$store.watch(
      (state, getters) => getters.PAGE_STACK,
      (newValue, oldValue) => {
        this.pageStack = newValue;
      }
    );
    this.$store.commit("PUSH_PAGE", MainPage);
  }
};
</script>
