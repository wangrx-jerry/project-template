// 自定义指令参考地址： https://www.cnblogs.com/moqiutao/p/8334780.html
import Vue from 'vue';

let currentCol = 0;
let currentLine = 0;
let isElementTable = false;

function getTargetDom (name, row, childDom) { // 递归查找父dom
	if(childDom.parentElement.nodeName === name) {
		return childDom.parentElement[row];
	}else{
		return getTargetDom(name, row, childDom.parentElement);
	}
}
function changeItem (it, keyCode) {
	if(currentLine < 0) {
		currentLine = it.rows.length - 1;
	}
	if(currentLine === it.rows.length) {
		currentLine = 0;
	}
	var objrow = it.rows[currentLine].getElementsByTagName('TD');
	if(currentCol < 0) {
		currentCol = objrow.length - 1;
	}else if(currentCol === objrow.length) {
		currentCol = 0;
	}
	let delay = isElementTable ? 300 : 0;
	if(objrow[currentCol].getElementsByTagName('INPUT').length) {
		setTimeout(() => {
			objrow[currentCol].getElementsByTagName('INPUT')[0].select();
		}, delay);
	}else if(objrow[currentCol].getElementsByTagName('TEXTAREA').length) {
		setTimeout(() => {
			objrow[currentCol].getElementsByTagName('TEXTAREA')[0].select();
		}, delay);
	}else{
		if(keyCode === 37) {
			currentCol--;
		}else{
			currentCol++;
		}
		changeItem(it, keyCode);
	}
}

function scrollInView (it) {
	if(currentLine < 0) {
		currentLine = it.rows.length - 1;
	}
	if(currentLine === it.rows.length) {
		currentLine = 0;
	}
	var objrow = it.rows[currentLine].getElementsByTagName('TD');
	if(currentCol < 0) {
		currentCol = objrow.length - 1;
	}else if(currentCol === objrow.length) {
		currentCol = 0;
	}
	let windowWidth = window.innerWidth;
	let tdLeft = objrow[currentCol].offsetLeft;
	let boxScrollLeft = document.querySelector('.el-table__body-wrapper').scrollLeft;
	if(windowWidth + boxScrollLeft < tdLeft + 100) {
		document.querySelector('.el-table__body-wrapper').scrollLeft += 260;
	}
	if(boxScrollLeft > tdLeft) {
		document.querySelector('.el-table__body-wrapper').scrollLeft -= 260;
	}
}

function directionKey (it, keyCode) {
	Vue.nextTick(() => {
		it = isElementTable ? it.querySelectorAll('table.el-table__body')[0] : it;
		switch(keyCode) {
		case 37: // 左键
			currentCol--;
			changeItem(it, keyCode);
			break;
		case 38: // 向上键
			currentLine--;
			changeItem(it, keyCode);
			break;
		case 39: // 右键 currentCol++;
			currentCol++;
			changeItem(it, keyCode);
			break;
		case 40: // 向下键
			currentLine++;
			changeItem(it, keyCode);
			break;
		default:
			break;
		}
		if(isElementTable) {
			scrollInView(it);
		}
	});
}

export default {
	install () {
		// eslint-disable-next-line no-unused-expressions
		Vue.directive('direction-key', {
			update: function (el, binding) {
				setTimeout(() => {
					let params = JSON.parse(binding.expression),
						beginLine = params[0] || 0,
						beginCol = params[1] || 0,
						inputs = el.querySelectorAll('input, textarea');
					isElementTable = params[2] || false; // true: element UI table; false: 正常table;
					for(const n of inputs) {
						n.addEventListener('keydown', ev => {
							if(ev.keyCode === 37 || ev.keyCode === 38 || ev.keyCode === 39 || ev.keyCode === 40) {
								currentLine = getTargetDom('TR', 'rowIndex', ev.target) - beginLine;
								currentCol = getTargetDom('TD', 'cellIndex', ev.target) - beginCol;
								if(isElementTable && (currentCol === 14 || currentCol === 15 || ev.keyCode === 40)) { // 针对检测数据table的特殊处理，临时方案，后期优化
									return;
								}
								directionKey(el, ev.keyCode);
							}
						});
					}
				}, 300);
			}
		// eslint-disable-next-line no-sequences
		}),
		Vue.directive('autoHeight', {
			inserted: function (el, binding) {
				let defaultHeight = 22;
				let expression = binding.expression;
				if(expression) {
					defaultHeight = expression;
				}
				el.addEventListener('input', (ev) => {
					ev.target.style.height = defaultHeight + 'px';
					ev.target.style.height = ev.target.scrollHeight + 'px';
				});
				el.addEventListener('propertychange', (ev) => {
					ev.target.style.height = defaultHeight + 'px';
					ev.target.style.height = ev.target.scrollHeight + 'px';
				});
				el.addEventListener('keydown', (ev) => {
					if(ev.keyCode === 13) {
						return false;
					}
				});
				setTimeout(() => {
					if(!el.value) {
						el.rows = 1;
					}else{
						el.style.height = el.scrollHeight + 'px';
					}
				}, 1000);
			}
		});
	}
};
