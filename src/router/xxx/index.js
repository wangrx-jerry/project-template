export default [
			{
				path: '/views/xxx/xxx.vue',
				name: 'xxx',
				component: () => import(/* webpackChunkName: "xxx" */'@/views/xxx/xxx.vue'),
				meta: {
					title: 'xxx'
				}
			}
		];