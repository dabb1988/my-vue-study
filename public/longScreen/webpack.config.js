const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  VueLoaderPlugin
} = require('vue-loader');

module.exports = {
  // mode: 'development',
  // 1.写成数组的方式就可以打出多入口文件，不过这里打包后的文件都合成了一个
  // entry: ['./src/index.js', './src/login.js'],
  // 2.真正实现多入口和多出口需要写成对象的方式
  entry: {
    main: './src/main.js',
    echarts: 'echarts'
  },
  output: {
    // 1. filename: 'bundle.js',
    // 2. [name]就可以将出口文件名和入口文件名一一对应
    filename: '[name].js', // 打包后会生成index.js和login.js文件
    path: path.resolve('dist')
  },
  module: {
    rules: [{
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
        include: /src/, // 只转化src目录下的js
        exclude: /node_modules/ // 排除掉node_modules，优化打包速度
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: /src/, // 只转化src目录下的js
        exclude: /node_modules/ // 排除掉node_modules，优化打包速度
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192, // 小于8k的图片自动转成base64格式，并且不会存在实体图片
            outputPath: 'images/' // 图片打包后存放的目录
          }
        }]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.join(__dirname, 'src')
    }
  },
  externals: {
    // echarts: "echarts"
  },
  plugins: [
    // 添加VueLoaderPlugin，以响应vue-loader
    new VueLoaderPlugin(),
    // 打包前先清空
    new CleanWebpackPlugin('dist'),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      chunks: ['vendor', 'echarts', 'utils', 'main'], // 对应关系,index.js对应的是index.html
    }),
  ],
  // 提取公共代码
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: { // 抽离第三方插件
          test: /node_modules/, // 指定是node_modules下的第三方包
          chunks: 'all',
          name: 'vendor', // 打包后的文件名，任意命名    
          // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
          priority: 10
        },
        utils111: { // 抽离自己写的公共代码，utils这个名字可以随意起
          chunks: 'initial',
          name: 'utils', // 任意命名
          minSize: 0 // 只要超出0字节就生成一个新包
        }
      }
    }
  }
}

console.log(path.join(__dirname, 'src'))