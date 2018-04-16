const config = require('./webpack.base.conf')
const merge = require('webpack-merge')

const proConfig = {
  "mode": "production"
}

module.exports = merge(config, proConfig)