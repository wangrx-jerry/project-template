const state = {
	showAxiosLoading: true,
	seasonSource: [
		{label: '全部', value: ''},
		{label: '春季', value: '春季'},
		{label: '夏季', value: '夏季'},
		{label: '秋季', value: '秋季'},
		{label: '冬季', value: '冬季'}
	],
	date: new Date()
};

const getters = {
	currentSeason: state => {
		let season = ['冬季', '冬季', '春季', '春季', '春季', '夏季', '夏季', '夏季', '秋季', '秋季', '秋季', '冬季'];
		return season[state.date.getMonth()];
	},
	yearSource: state => {
		let currentYear = state.date.getFullYear();
		let beginYear = 2017;
		let yearSource = [];
		for(let i = beginYear; i <= currentYear + 4; i++) {
			yearSource.push({
				value: i,
				label: i // 扩展label属性,适配更多情况 杨利国 2019/12/16
			});
		}
		return yearSource;
	}
};

const mutations = {
	controlAxiosLoading (state, option) {
		state.showAxiosLoading = option;
		if(!option) {
			setTimeout(() => {
				state.showAxiosLoading = true;
			}, 300);
		}
	}
};

export default {
	state,
	getters,
	mutations
}
;
