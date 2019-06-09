const { exec } = require('child_process')
const { promisify} = require('util')
const execa = promisify(exec)

module.exports = (name, command, dir) => {
  if(dir === undefined) dir = process.cwd() + '/'
  return new Promise(async resolve => {
		await execa(`cd ${dir}${name} && ${command}`)
		resolve(true)
	});
}