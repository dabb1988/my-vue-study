const config = require('./webpack.base.conf')
const merge = require('webpack-merge')

const proConfig = {
	"mode": "production"
}

const prod = merge(config, proConfig)

if(process.env.analyz_npm_config_report) {
	const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
	prod.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = prod