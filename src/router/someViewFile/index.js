export default [
	{
		path: '/',
		name: 'index',
		component: () => import(/* webpackChunkName: "nodeTest" */'@/views/someFile/index.vue'),
		meta: {
			title: 'xxx'
		}
	}
];
