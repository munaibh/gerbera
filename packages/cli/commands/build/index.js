const webpack = require('webpack')
const webpackConfig = require('../../config/webpack/webpack.config')
const webpackMessager = require('../utils/webpackMessager.js')

module.exports = () => {
  webpackConfig.mode = 'production'
  const compiler = webpack(webpackConfig)
  const messager = webpackMessager(compiler)
  compiler.run()
}