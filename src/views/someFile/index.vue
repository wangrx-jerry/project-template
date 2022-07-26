/*
    * @Author: wrx
    * 博客首页
*/
<template>
    <div class="p15 tc">
		<p> on click away</p>
		<!-- <p v-on-clickaway="away"> on click away</p> -->
		some view page
		<render-com  :clickHandler="clickHandler">
			main
			<div slot="footer">footer</div>
		</render-com>
		<anchored-heading :level="1">sss</anchored-heading>
    </div>
</template>
<script>
import {directive as onClickaway} from 'vue-clickaway';
export default {
	directives: {
		onClickaway: onClickaway
	},
	components: {
		'render-com': {
			render: function (createElement) {
				var body = this.$slots.default;
				var footer = this.$slots.footer;
				return createElement('div', {class: 'p15'}, [
					'this is some text',
					createElement('header',
						{
							class: 'pt10',
							on: {
								click: this.clickHandler
							}
						},
						'带有attribute配置'
					),
					createElement('main', body),
					createElement('footer', footer)
				]);
			},
			props: {
				clickHandler: {
					type: Function,
					default: () => {}
				}
			}
		},
		'anchored-heading': {
			render: function (createElement) {
				return createElement(
					'h' + this.level,
					this.$slots.default
				);
			},
			props: {
				level: {
					type: Number,
					default: 1
				}
			}
		}
	},
	data () {
		return {};
	},
	created () {
	},
	mounted () {},
	computed: {},
	methods: {
		clickHandler () {
			// console.log(p);
		},
		away () {
			// console.log(ev);
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
