const webpack = require('webpack');
const WebpackConfig = require('../../config/webpack/webpack.config');
const webpackMessager = require('../utils/webpackMessager.js')

module.exports = () => {
  const compiler = webpack(WebpackConfig)
  const messager = webpackMessager(compiler)
  compiler.run()
}