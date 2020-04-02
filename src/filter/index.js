// 自定义指令参考地址： https://www.cnblogs.com/moqiutao/p/8334780.html
import Vue from 'vue';
export default {
	install () {
		Vue.filter('filter', (val, option = '-') => {
			return val || option;
		});
		Vue.filter('point', (val, point = 2) => {
			return val ? Number(val).toFixed(point) : 0;
		});
		Vue.filter('clearPoint', (val, point = 2) => {
			return val ? Number(val.toFixed(point)) : '-';
		});
		Vue.filter('unit', (val, unit = '', emptyTips = '-') => {
			return val ? val + unit : emptyTips;
		});
		Vue.filter('cardNo', (value) => {
			if(value && /\S{5}/.test(value)) {
				return value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ');
			}else{
				return value;
			}
		});
	}
};
