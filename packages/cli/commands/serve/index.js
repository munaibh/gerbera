const path = require('path')
const { spawn } = require('child_process')

const startDocker = () => {  
  var dockerConfig = path.join(__dirname,'..', '..', 'config', 'docker', 'docker-compose.yml')
  var docker = spawn(`docker-compose`, ['-f', `${dockerConfig}`, '--project-directory', process.cwd(), 'up']);
  docker.stdout.on('data', (data) => console.log(`stdout: ${data}`))
  docker.stderr.on('data', (data) => console.log(`stderr: ${data}`))
}

module.exports = (args, rawArgs) => {
  startDocker()
}