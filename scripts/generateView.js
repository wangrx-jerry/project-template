// generateView.js
// 1. 可直接生成.vue 文件， 也可生成文件夹
// 2. 存在相同文件夹复用
// 3. 同步更新对应的router文件：
// 	3.1 如果router没有对应的文件夹则新建文件夹
// 	3.2 如果router有对应的index文件，则在文件中增加对应的路由信息
// 4. 创建完成后打开刚才创建文件

const chalk = require('chalk');// 修改控制台输出
const path = require('path');// 获取路径
const fs = require('fs');// 文件解析
const resolve = (...file) => path.resolve(__dirname, ...file);
const log = message => console.log(chalk.green(`${message}`));
const successLog = message => console.log(chalk.blue(`${message}`));
const errorLog = error => console.log(chalk.red(`${error}`));
const {vueTemplate, routerFileTemplate, routerTemplate} = require('./template');

const generateFile = (path, data) => {
	if(fs.existsSync(path)) {
		errorLog(`${path}文件已存在`);
		return;
	}
	return new Promise((resolve, reject) => {
		fs.writeFile(path, data, 'utf8', err => {
			if(err) {
				errorLog(err.message);
				reject(err);
			}else{
				resolve(true);
			}
		});
	});
};
log('请输入要生成的页面组件名称、会生成在 views/目录下');
let componentName = '';
process.stdin.on('data', async chunk => {
	const inputName = String(chunk).trim().toString();
	/**
     * Vue页面组件路径
     */
	let componentVueName = resolve('../src/views', inputName);
	// 如果不是以 .vue 结尾的话，自动加上
	if(!componentVueName.endsWith('.vue')) {
		componentVueName += '.vue';
	}
	/**
     * vue组件目录路径
     */
	const componentDirectory = path.dirname(componentVueName);

	const hasComponentExists = fs.existsSync(componentVueName);
	if(hasComponentExists) {
		errorLog(`${inputName}页面组件已存在，请重新输入`);
		return;
	}else{
		log(`正在生成 component 目录 ${componentDirectory}`);
		await dotExistDirectoryCreate(componentDirectory);
	}
	try {
		if(inputName.includes('/')) {
			const inputArr = inputName.split('/');
			componentName = inputArr[inputArr.length - 1];
		}else{
			componentName = inputName;
		}
		log(`正在生成 vue 文件 ${componentVueName}`);
		await generateFile(componentVueName, vueTemplate(componentName));
		successLog(`component:${componentName}生成成功`);
	} catch (e) {
		errorLog(e.message);
	}

	/**
	 * Vue页面组件对应路由的路径
	 */
	let routerFolderDirectory = '';
	if(inputName.includes('/')) {
		const inputArr = inputName.split('/');
		routerFolderDirectory = resolve('../src/router', inputArr[0]);
	}else{
		routerFolderDirectory = resolve('../src/router', inputName);
	}
	const routerFileDirectory = routerFolderDirectory + '/index.js';

	const hasRouterExists = fs.existsSync(routerFolderDirectory);
	// 如果文件夹已经存在则校验文件夹/index.js 是否已经有对应的路径配置
	if(hasRouterExists) {
		console.log('路由文件已存在，直接写入');
		const routerWriteStream = createWriteStream(routerFileDirectory);
		writeStream(routerWriteStream, routerTemplate(componentName));
	}else{ // 文件夹不存在则新增对应的路由文件夹
		log(`正在生成 router 目录 ${routerFolderDirectory}`);
		await dotExistDirectoryCreate(routerFolderDirectory);
		await generateFile(routerFileDirectory, routerFileTemplate(componentVueName, componentName, routerFolderDirectory));
		successLog(`${componentName}路由生成成功`);
	}

	process.stdin.emit('end');
});
process.stdin.on('end', () => {
	log('exit');
	process.exit();
});
function dotExistDirectoryCreate (directory) {
	return new Promise((resolve) => {
		mkdirs(directory, function () {
			resolve(true);
		});
	});
}

// 递归创建目录
function mkdirs (directory, callback) {
	var exists = fs.existsSync(directory);
	if(exists) {
		callback();
	}else{
		mkdirs(path.dirname(directory), function () {
			fs.mkdirSync(directory);
			callback();
		});
	}
}

function createWriteStream (path) {
	const filePath = resolve(path);
	const writeStream = fs.createWriteStream(filePath, {
		flags: 'a'// 日志累加（每次重启都不会清空）
	});
	return writeStream;
}

function writeStream (writeStream, log) {
	writeStream.write(log + '\n');
}

function access (log) {
	writeStream(accessWriteStream, log);
}
