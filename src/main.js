import "onsenui/css/onsenui.css";
import "onsenui/css/onsen-css-components.css";
import "@mdi/font/css/materialdesignicons.css";

import Vue from "vue";
import VueOnsen from "vue-onsenui";
import App from "./App.vue";
import store from "./store";
import "./registerServiceWorker";

Vue.config.productionTip = false;

Vue.use(VueOnsen);

new Vue({
  store,
  render: h => h(App),
  beforeCreate() {
    this.$ons.disableIconAutoPrefix();
    this.$store.dispatch("init");
  }
}).$mount("#app");
