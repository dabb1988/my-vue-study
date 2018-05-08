const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')

// 基本设置
module.exports = {
  context: path.resolve(__dirname, "../"),
  entry: {app:['webpack-hot-middleware/client?noInfo=true&reload=true', './client/main.js']},
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist')
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
  ],
  resolve: {
    alias: {
      // http://www.mamicode.com/info-detail-2193044.html 有详细解释
      'vue': 'vue/dist/vue.js'
    }
  }
}