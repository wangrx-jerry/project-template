import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store";
import util from "./assets/js/util";

import "@/components";
import "@/plugins/element.js";
import "@/api/axiosSetting";
import "@/assets/styles/variable.css";
import "@/assets/styles/reset.css";

Vue.config.productionTip = false;

Vue.use(util);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
