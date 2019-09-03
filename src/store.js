import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pageStack: [],
    settings: {
      group: null
    },
    installEvent: null,
    lastRasp: null
  },
  getters: {
    PAGE_STACK: state => {
      return state.pageStack;
    },
    SETTINGS: state => {
      return state.settings;
    },
    INSTALL_EVENT: state => {
      return state.installEvent;
    },
    LAST_RASP: state => {
      return state.lastRasp;
    }
  },
  mutations: {
    PUSH_PAGE: (state, payload) => {
      state.pageStack.push(payload);
    },
    SET_SETTINGS: (state, payload) => {
      state.settings = payload;
      localStorage.setItem("settings", JSON.stringify(state.settings));
    },
    SET_GROUP: (state, payload) => {
      state.settings.group = payload;
      localStorage.setItem("settings", JSON.stringify(state.settings));
    },
    SET_INSTALL_EVENT: (state, payload) => {
      state.installEvent = payload;
    },
    SET_LAST_RASP: (state, payload) => {
      state.lastRasp = payload;
      localStorage.setItem("rasp", JSON.stringify(state.lastRasp));
    }
  },
  actions: {
    init() {
      if (localStorage.getItem("settings"))
        try {
          this.commit(
            "SET_SETTINGS",
            JSON.parse(localStorage.getItem("settings"))
          );
        } catch (e) {
          localStorage.removeItem("settings");
        }
      if (localStorage.getItem("rasp"))
        try {
          this.commit(
            "SET_LAST_RASP",
            JSON.parse(localStorage.getItem("rasp"))
          );
        } catch (e) {
          localStorage.removeItem();
        }
    },
    resetSettings() {
      localStorage.removeItem("settings");
      localStorage.removeItem("rasp");
      window.location.reload();
    }
  }
});
