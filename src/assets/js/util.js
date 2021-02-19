import Vue from 'vue';
import clone from './clone.js';
// import ElementUI from 'element-ui';
// let Vue = window.Vue,
// 	ElementUI = window.ELEMENT;

class Helper {
	constructor () {
		this.clone = clone;
	}

	isEmptyObj (obj) {
		for(let key in obj) {
			if(obj[key]) {
				return false;
			}
		}
		return true;
	}

	// 交集
	intersect () {
		var result = [];
		var obj = {};
		for(var i = 0; i < arguments.length; i++) {
			for(var j = 0; j < arguments[i].length; j++) {
				var str = arguments[i][j];
				if(!obj[str]) {
					obj[str] = 1;
				}else{
					obj[str]++;
					if(obj[str] === arguments.length) {
						result.push(str);
					}
				} // end else
			} // end for j
		} // end for i
		return result;
	}

	// 格式化时间格式 yyyy-MM-dd
	getDate (timeStamp = new Date(), splitSymble = '-', format = 'YYYY-MM-DD') {
		if(!timeStamp) return '';
		if(typeof timeStamp === 'string') timeStamp = timeStamp.replace(/-/g, '/');
		let date = new Date(timeStamp);
		let beauty = num => {
			return num > 9 ? num : '0' + num;
		};
		let timeDetail = [];
		if(/[Yy]{4}/.test(format)) timeDetail.push(beauty(date.getFullYear()));
		if(/[Mm]{2}/.test(format)) timeDetail.push(beauty(date.getMonth() + 1));
		if(/[Dd]{2}/.test(format)) timeDetail.push(beauty(date.getDate()));
		return timeDetail.join(splitSymble);
	}

	// 格式化时间格式 hh:mm:ss
	getTimeDetail (
		timeStamp = new Date().getTime(),
		splitSymble = ':',
		format = 'hh:mm:ss'
	) {
		if(!timeStamp) return '';
		if(typeof timeStamp === 'string') timeStamp = timeStamp.replace(/-/g, '/');
		let date = new Date(timeStamp);
		let beauty = num => {
			return num > 9 ? num : '0' + num;
		};
		let timeDetail = [];
		if(/[Hh]{2}/.test(format)) timeDetail.push(beauty(date.getHours()));
		if(/[Mm]{2}/.test(format)) timeDetail.push(beauty(date.getMinutes()));
		if(/[Ss]{2}/.test(format)) timeDetail.push(beauty(date.getSeconds()));
		return timeDetail.join(splitSymble);
	}

	addClass (obj, cls) {
		var objClass = obj.className; // 获取 class 内容.
		var blank = objClass !== '' ? ' ' : ''; // 判断获取到的 class 是否为空, 如果不为空在前面加个'空格'.
		var added = objClass + blank + cls; // 组合原来的 class 和需要添加的 class.
		obj.className = added; // 替换原来的 class.
	}

	removeClass (obj, cls) {
		var objClass = ' ' + obj.className + ' '; // 获取 class 内容, 并在首尾各加一个空格. ex: 'abc    bcd' -> ' abc    bcd '
		objClass = objClass.replace(/(\s+)/gi, ' '); // 将多余的空字符替换成一个空格. ex: ' abc    bcd ' -> ' abc bcd '
		var removed = objClass.replace(' ' + cls + ' ', ' '); // 在原来的 class 替换掉首尾加了空格的 class. ex: ' abc bcd ' -> 'bcd '
		removed = removed.replace(/(^\s+)|(\s+$)/g, ''); // 去掉首尾空格. ex: 'bcd ' -> 'bcd'
		obj.className = removed; // 替换原来的 class.
	}

	hasClass (obj, cls) {
		var objClass = obj.className; // 获取 class 内容.
		var objClassList = objClass.split(' '); // 通过split空字符将cls转换成数组.
		for(const n of objClassList) {
			if(n === cls) {
				// 循环数组, 判断是否包含cls
				return true;
			}
		}
		return false;
	}

	// 获取url后面的请求参数
	getRequestParam () {
		var url = location.search;
		var theRequest = {};
		if(url.indexOf('?') !== -1) {
			var strs = url.substr(1).split('&');
			for(var i = 0; i < strs.length; i++) {
				theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1]);
			}
		}
		return theRequest;
	}

	// 数字金额转换文字
	numToChinese (n) {
		var fraction = ['角', '分'];
		var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
		var unit = [
			['元', '万', '亿'],
			['', '拾', '佰', '仟']
		];
		var head = n < 0 ? '欠' : '';
		n = Math.abs(n);
		var s = '';
		for(var i = 0; i < fraction.length; i++) {
			s += (
				digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]
			).replace(/零./, '');
		}
		s = s || '整';
		n = Math.floor(n);
		for(var o = 0; o < unit[0].length && n > 0; o++) {
			var p = '';
			for(var j = 0; j < unit[1].length && n > 0; j++) {
				p = digit[n % 10] + unit[1][j] + p;
				n = Math.floor(n / 10);
			}
			s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][o] + s;
		}
		return (head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整'));
	}

	// 将搜索参数缓存
	setSearchCache (param, key) {
		let user = JSON.parse(sessionStorage.getItem('user'));
		key = key || window.location.pathname + '_' + user.fgidUserID;
		localStorage.setItem(key, JSON.stringify(param));
	}

	// 在缓存中取搜索参数
	getSearchCache (key) {
		let user = JSON.parse(sessionStorage.getItem('user'));
		key = key || window.location.pathname + '_' + user.fgidUserID;
		var param = localStorage.getItem(key) || '{}';
		return JSON.parse(param);
	}

	compare (key) {
		return (a, b) => {
			let value1 = a[key];
			let value2 = b[key];
			return value1 - value2;
		};
	}

	// 通过指定key排序数组
	sortByKey (arr, key) {
		return arr.sort(this.compare(key));
	}

	// 获取剪切板数据
	getPasteData (e, fn) {
		var cbd = e.clipboardData;
		var ua = window.navigator.userAgent;
		// 如果是 Safari 直接 return
		if(!(e.clipboardData && e.clipboardData.items)) {
			return;
		}
		// Mac平台下Chrome49版本以下 复制Finder中的文件的Bug Hack掉
		if(cbd.items &&
            cbd.items.length === 2 &&
            cbd.items[0].kind === 'string' &&
            cbd.items[1].kind === 'file' &&
            cbd.types && cbd.types.length === 2 && cbd.types[0] === 'text/plain' &&
            cbd.types[1] === 'Files' &&
            ua.match(/Macintosh/i) &&
            Number(ua.match(/Chrome\/(\d{2})/i)[1]) < 49) {
			return;
		}
		for(var i = 0; i < cbd.items.length; i++) {
			var item = cbd.items[i];
			if(item.kind === 'file') {
				var blob = item.getAsFile();
				if(blob.size === 0) {
					return;
				}
				fn(blob);
			}
		}
	}

	// 小数位限制
	limitPoint (value, point = 2, max = 99999999, min = 0) {
		value = String(value);
		let isNegative = false;
		if(min < 0 && value.includes('-')) {
			isNegative = true;
		}
		value = value.replace(/[^\d.]/g, '');// 只能输入数字
		if(point === 0) {
			if(value.length === 1) {
				value = value.replace(/[^0-9]/g, '');
			}else{
				value = value.replace(/\D/g, '');
			}
		}else if(point === 1) {
			value = value
			// 只允许一个小数点
				.replace(/^\./g, '').replace(/\.{2,}/g, '.')
			// 只能输入小数点后三位
				.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.').replace(/^(-)*(\d+)\.(\d).*$/, '$1$2.$3');
		}else if(point === 2) {
			value = value
			// 只允许一个小数点
				.replace(/^\./g, '').replace(/\.{2,}/g, '.')
			// 只能输入小数点后2位
				.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.').replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
		}else if(point === 3) {
			value = value
			// 只允许一个小数点
				.replace(/^\./g, '').replace(/\.{2,}/g, '.')
			// 只能输入小数点后三位
				.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.').replace(/^(-)*(\d+)\.(\d\d\d).*$/, '$1$2.$3');
		}else if(point === 4) {
			value = value
			// 只允许一个小数点
				.replace(/^\./g, '').replace(/\.{2,}/g, '.')
			// 只能输入小数点后三位
				.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.').replace(/^(-)*(\d+)\.(\d\d\d\d).*$/, '$1$2.$3');
		}
		if(value.indexOf('.') < 0 && value !== '' && value !== '-') { // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
			value = parseFloat(value);
		}
		if(isNegative) {
			value = '-' + value;
		}
		if(value > max || value < min) {
			value = value.toString();
			value = value.substr(0, value.length - 1);
		}
		if(value === '') {
			return '';
		}else{
			return value;
		}
	}

	// 仅删除第一个匹配项，如果是对象数组，则value传入对象
	removeItemOnce (arr, value) {
		if(Array.isArray(arr) && arr.length) {
			let index = -1;
			if(typeof value === 'object') {
				let searchKey = Object.keys(value)[0],
					searchValue = Object.values(value)[0];
				index = arr.findIndex(val => val[searchKey] === searchValue);
			}else{
				index = arr.indexOf(value);
			}
			if(index > -1) {
				arr.splice(index, 1);
			}
		}
	}

	// 删除所有匹配项，如果是对象数组，则value传入对象
	removeItemAll (arr, value) {
		let i = 0;
		while(i < arr.length) {
			if(typeof value === 'object') {
				let searchKey = Object.keys(value)[0],
					searchValue = Object.values(value)[0];
				if(arr[i][searchKey] === searchValue) {
					arr.splice(i, 1);
				}else{
					++i;
				}
			}else{
				if(arr[i] === value) {
					arr.splice(i, 1);
				}else{
					++i;
				}
			}
		}
	}
}
let util = new Helper();
Vue.prototype.util = util;
export default util;
