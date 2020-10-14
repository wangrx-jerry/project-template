/*
    * @Author: wrx
    * 博客首页
*/
<template>
    <div class="p15 tc common-util">
		<div class="p15">
			<el-button type="primary" size="mini" @click="theme('light')">light</el-button>
			<el-button type="primary" size="mini" @click="theme('dark')">dark</el-button>
		</div>
		<div class="text">
			some view page
		</div>
    </div>
</template>
<script>
export default {
	data () {
		return {};
	},
	created () {
	},
	mounted () {},
	computed: {},
	methods: {
		// 换主题
		theme (type) {
			// this.$store.commit('upDate', {themeType: type});
			window.document.documentElement.setAttribute('data-theme', type);
		}
	}
};
</script>
<style scoped lang='scss'>
// @import "@/assets/styles/_handle.scss";
    // .common-util {
    //     font-size: 18px;
    //     @include font_color("font_color1");
    //     @include background_color("background_color1");
    //     @include border_color("border_color1");
	// }
	// .text{
	// 	border: 1px solid;
	// 	@include border_color("border_color1");
	// }
</style>
