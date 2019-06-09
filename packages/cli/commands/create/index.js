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
  
  // Create Block using template directory
  spinner.start( `1. Creating block called -> ${params.name}` )
  await copy(template, path.join(process.cwd(), params.name), params)
  spinner.succeed()

  // Installing NPM Dependencies
  spinner.start( '2. Installing npm packages...' )
  await exec(params.name, `npm install`)
  spinner.succeed();
}

module.exports = (args, rawArg) => {
  if(!args[1]) return console.error('Please enter a name')
  clearConsole()
  startCreate(args)
}