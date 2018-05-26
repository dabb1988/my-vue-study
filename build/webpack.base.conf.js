const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

// 基本设置
module.exports = {
	context: path.resolve(__dirname, "../"),
	entry: {
		//		app: ['webpack-hot-middleware/src?noInfo=true&reload=true', './src/main.js']
		app: './src/main.js'
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, '../dist')
	},
	module: {
		rules: [{
			test: /\.js$/,
			use: ['babel-loader']
		}, {
			test: /\.vue$/,
			loader: 'vue-loader',
			options: {
				loaders: {
					js: 'babel-loader'
				}
			}
		}]
	},
	// 提取公共代码
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: { // 抽离第三方插件
					test: /node_modules/, // 指定是node_modules下的第三方包
					chunks: 'initial',
					name: 'vendor', // 打包后的文件名，任意命名    
					// 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
					priority: 10
				},
				utils: { // 抽离自己写的公共代码，utils这个名字可以随意起
					chunks: 'initial',
					name: 'utils', // 任意命名
					minSize: 0 // 只要超出0字节就生成一个新包
				}
			}
		}
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new CleanWebpackPlugin(['dist'], {
			root: __dirname,
			verbose: true,
			dry: false
		}),
		new CopyWebpackPlugin(
			[{
				from: path.join(__dirname, "../assets/images"),
				to: path.join(__dirname, '/dist/images')
			}], {
				copyUnmodified: true
			}
		),
		new HtmlWebpackPlugin({
			template: './client/index.ejs',
			filename: 'index.html'
		}),
		new VueLoaderPlugin(),
	],
	resolve: {
		alias: {
			// http://www.mamicode.com/info-detail-2193044.html 有详细解释
			'vue': 'vue/dist/vue.js'
		}
	}
}