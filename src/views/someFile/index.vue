/*
    * @Author: wrx
    * 博客首页
*/
<template>
    <div class="p15 tc">
		<p v-on-clickaway="away"> on click away</p>
		some view page
    </div>
</template>
<script>
import {directive as onClickaway} from 'vue-clickaway';
export default {
	directives: {
		onClickaway: onClickaway
	},
	data () {
		return {};
	},
	created () {
	},
	mounted () {},
	computed: {},
	methods: {
		away (ev) {
			console.log(ev);
		}
	}
};
</script>
<style scoped lang='scss'>
</style>
