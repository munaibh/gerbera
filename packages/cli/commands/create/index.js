const ora  = require('ora')
const chalk  = require('chalk')
const path = require('path')
const copy = require('../utils/copy')
const exec = require('../utils/exec')
const clearConsole = require('../utils/clearConsole')

const getParams = args => ({
  name: args[1],
  namespace: args[1].replace(/-/g, '_'),
  description: args[2] || ''
})

const startCreate = async (args) => {
  const spinner = ora()
  const template = path.join(__dirname, '..', '..', 'generate')
  const params = getParams(args)
  
  console.log(`🎉  Creating gutenberg project ${chalk.bold.blue(params.name)} \n`)
  console.log(chalk.dim(`${path.join(process.cwd(), params.name)}`))
  console.log(chalk.dim(`This could take a while, grab some tea...`))
  console.log('')

  // Create Block using template directory
  spinner.start( `Scaffolding Gutenberg Block...` )
  await copy(template, path.join(process.cwd(), params.name), params)
  spinner.succeed()

  // Installing NPM Dependencies
  spinner.start( 'Installing npm packages...' )
  await exec(params.name, `npm install`)
  spinner.succeed()
  console.log('')
}

module.exports = (args, rawArg) => {
  if(!args[1]) return console.error('Please enter a name')
  clearConsole()
  startCreate(args)
}