// TODO: 设置主题，参考地址：https://segmentfault.com/a/1190000009762198#articleHeader2
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/vuex';
import util from './assets/js/util';
import directive from '@/directive/index';
import filter from '@/filter/index';
import ElementUI from 'element-ui';
import localStorage from './store/localStorage';
import sessionStorage from './store/sessionStorage';

import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/styles/variable.scss';
import '@/assets/styles/reset.css';
import '@/assets/styles/common.css';
import '@/assets/styles/_theme.scss';
import '@/api/axiosSetting';
import 'animate.css/animate.min.css';
import '@/components/index';

Vue.use(util);
Vue.use(directive);
Vue.use(filter);
Vue.use(ElementUI);
Vue.use(sessionStorage);
Vue.use(localStorage);

Vue.config.productionTip = false;
Vue.config.devtools = true;
Vue.config.performance = true;
Vue.config.errorHandler = function (err) {
	// eslint-disable-next-line no-console
	console.log('vue错误捕获：', err);
	ElementUI.Message(err.toString());
};

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
