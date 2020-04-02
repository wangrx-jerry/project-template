import Vue from 'vue';
import Router from 'vue-router';
// let Vue = window.Vue;

Vue.use(Router);

let routes = [
	{
		path: '*',
		component: () => import(/* webpackChunkName: "404" */ '@/views/error/404.vue')
	}
];

const routerContext = require.context('./', true, /index\.js$/);
routerContext.keys().forEach(route => {
	// 如果是根目录的 index.js 、不处理
	if(route.startsWith('./index')) {
		return;
	}
	const routerModule = routerContext(route);
	/**
   * 兼容 import export 和 require module.export 两种规范
   */
	routes = [...routes, ...(routerModule.default || routerModule)];
});

const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: routes
});
router.beforeEach(async (to, from, next) => {
	document.title = (typeof to.meta.title === 'function' ? to.meta.title(to) : to.meta.title) || '无标题';
	next();
});

export default router;
