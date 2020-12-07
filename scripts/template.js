module.exports = {
	vueTemplate: compoenntName => {
		return `<template>
					<div class="${compoenntName}">
						${compoenntName}组件
					</div>
				</template>
				<script>
					export default {
						name: '${compoenntName}'
					}
				</script>
				<style lang="scss" scoped>
					.${compoenntName} {

					}
				</style>
				`;
	},
	routerFileTemplate: (componentPath, compoenntName, routerFolderDirectory) => {
		const pathArr = componentPath.split('/src'),
			relativePath = pathArr.slice(-1)[0];
		return `export default [
			{
				path: '${relativePath}',
				name: '${compoenntName}',
				component: () => import(/* webpackChunkName: "${routerFolderDirectory.split('/router/').slice(-1)[0]}" */'@${relativePath}'),
				meta: {
					title: 'xxx'
				}
			}
		];`;
	},
	routerTemplate: (compoenntName) => {
		return `
			{
				path: 'xxx',
				name: 'xxx',
				component: () => import(/* webpackChunkName: "${compoenntName}" */'@xxx'),
				meta: {
					title: 'xxx'
				}
			}
		`;
	},
	entryTemplate: `import Main from './main.vue'
					export default Main`
};
