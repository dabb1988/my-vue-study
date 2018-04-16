const baseConfig = require('./webpack.base.conf')
const merge = require('webpack-merge')

const devConfig = {
  "mode": "development"
}

module.exports = merge(baseConfig, devConfig)