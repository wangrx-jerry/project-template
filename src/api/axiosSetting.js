import Vue from 'vue';
import ElementUI from 'element-ui';
import axios from 'axios';
import store from '../store/vuex';
import router from '../router';

let service = axios.create({
	baseURL: window.location.protocol + '//' + window.location.host + '/',
	timeout: 60000,
	contentType: 'application/json'
});

let loading = null;
let setTime = null;
let tid = null;
let delay = 50;
let options = {
	lock: true,
	text: '加载中～',
	background: 'rgba(0, 0, 0, 0.7)'
};

service.interceptors.request.use(config => {
	if(store.state.global.useGlobalAxios) { // 如果全局（vuex）配置了不使用axios loading则跳过
		clearTimeout(setTime);
		clearTimeout(tid);
		// 请求时间如果在500毫秒内则不需要显示loading
		setTime = setTimeout(() => {
			loading = ElementUI.Loading.service(options);
		}, delay * 10);
	}
	return config;
});

service.interceptors.response.use(
	response => {
		// 保证200毫秒内发起再次发起请求不会关闭loading
		tid = setTimeout(() => {
			clearTimeout(setTime);
			loading && loading.close();
		}, 200);
		try {
			// 根据后台标识判断后台返回信息是否正常
			if(response.data.errno !== 0) {
				ElementUI.Message({
					message: response.data.message,
					type: 'warning',
					showClose: true
				});
			}
		} catch (e) {
		}
		return response.data;
	},
	error => {
		// 保证200毫秒内发起再次发起请求不会关闭loading
		tid = setTimeout(() => {
			clearTimeout(setTime);
			loading && loading.close();
		}, 200);
		try {
			if(/Network Error|504/.test(error.message)) {
				// 网络错误/504
				ElementUI.Message({
					message: '暂无网络连接，请连接后重新尝试',
					type: 'warning',
					showClose: true
				});
				// 待完成： 这里写一个断网的组件
				return;
			}
			// 请求授权失败则重新跳转到登陆页
			if(error.response.data.Code === 401) {
				setTimeout(() => {
					router.push({
						name: 'login'
					});
				}, 2000);
			}
		} catch (e) {
		}
		return Promise.reject(error);
	}
);
Vue.prototype.axios = service;
