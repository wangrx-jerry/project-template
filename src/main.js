import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store";

import "./components";
import "./plugins/element.js";
import "./api/axiosSetting";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
