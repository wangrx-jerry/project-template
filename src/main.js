import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store";

import "./components";
import "./plugins/element.js";
import "./api/axiosSetting";
import "@/assets/css/common.css";
import "@/assets/css/reset.css";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
