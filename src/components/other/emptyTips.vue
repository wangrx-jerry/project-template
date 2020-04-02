/*
	* @Author: wrx
	* 非全局 的 非业务组件
*/
<template>
	<div class="tc p10">
		{{mes}}
	</div>
</template>
<script>
export default {
	props: {
		mes: {
			type: String,
			default: ''
		}
	},
	data () {
		return {};
	},
	created () {},
	mounted () {},
	computed: {},
	methods: {}
};
</script>
<style scoped lang='scss'>
</style>
