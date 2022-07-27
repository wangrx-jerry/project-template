const CompressionPlugin = require('compression-webpack-plugin');
module.exports = {
	devServer: {
		port: 9999,
		proxy: {
			'/api': {
				// target: 'http://test2.ihappygroup.net/api',
				// target: 'http://test2.ihappygroup.net/api',
				target: 'localhost:3333/api',
				// target: 'http://scm.ihappygroup.net/api',
				// target: 'http://localhost:34800/api',
				changeOrigin: true,
				pathRewrite: {
					'^/api': ''
				}
			}
		}
	},
	publicPath: process.env.NODE_ENV === 'production' ? '/html/pc/' : '/',
	assetsDir: 'static',
	configureWebpack: config => {
		if(process.env.NODE_ENV === 'production') {
			return {
				plugins: [new CompressionPlugin({
					test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
					// test: /\.js$|\.html$|\.css$/,
					algorithm: 'gzip',
					threshold: 10240,
					minRatio: 0.8,
					deleteOriginalAssets: false
				})]
			};
		}
	},
	chainWebpack: config => {
		if(process.env.NODE_ENV === 'production') {
			// #region 忽略生成环境打包的文件

			var externals = {
				vue: 'Vue',
				axios: 'axios',
				'element-ui': 'ELEMENT',
				'vue-router': 'VueRouter',
				vuex: 'Vuex'
			};
			config.externals(externals);
			const cdn = {
				css: [
					// element-ui css
					'//unpkg.com/element-ui@2.12.0/lib/theme-chalk/index.css'
				],
				js: [
					// vue
					'//cdn.staticfile.org/vue/2.5.17/vue.min.js',
					// vue-router
					'//cdn.staticfile.org/vue-router/3.0.2/vue-router.min.js',
					// vuex
					'//cdn.staticfile.org/vuex/3.1.2/vuex.min.js',
					// axios
					'//cdn.staticfile.org/axios/0.19.0-beta.1/axios.min.js',
					// element-ui js
					'//unpkg.com/element-ui@2.12.0/lib/index.js'
				]
			};
			config.plugin('html')
				.tap(args => {
					args[0].cdn = cdn;
					return args;
				});

			// #endregion

			// #region 分析打包体积

			// if(process.env.IS_ANALYZE) {
			// 	config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
			// 		{
			// 			analyzerMode: 'static'
			// 		}
			// 	]);
			// }

			// #endregion 分析打包体积
		}
	}
};
// css: {
// 	loaderOptions: {
// 		sass: {
// 			data: `
// 			@import "@/assets/styles/mixin.scss";
// 		`
// 		}
// 	}
// }
// };
