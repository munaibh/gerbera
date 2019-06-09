const path = require('path')
const WebpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')
const WebpackConfig = require('../../config/webpack/webpack.config')
const webpackMessager = require('../utils/webpackMessager.js')
const { spawn } = require('child_process')

const startDocker = () => {  
  var dockerConfig = path.join(__dirname,'..', '..', 'config', 'docker', 'docker-compose.yml')
  var docker = spawn(`docker-compose`, ['-f', `${dockerConfig}`, '--project-directory', process.cwd(), 'up']);
  docker.stdout.on('data', (data) => console.log(`stdout: ${data}`))
  docker.stderr.on('data', (data) => console.log(`stderr: ${data}`))
}

const startDevServer = () => {
  const compiler = webpack(WebpackConfig)
  const messager = webpackMessager(compiler)

  const server = new WebpackDevServer(compiler, {
    hot: true,
    inline: true,
    host: '0.0.0.0',
    port: 9000,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    disableHostCheck: true,
    quiet: true,
    contentBase: process.cwd() + '/build'
  })

  server.listen(9000)
}

module.exports = (args, rawArgs) => {
  const useDocker = args.includes('--docker')
  useDocker && startDocker()
  startDevServer()
}