const clear = require('./clearConsole')
const format = require('webpack-format-messages')
const chalk = require('chalk')

module.exports = compiler => {
  const log = str => console.log(str)
  const start = _ => {
    let message = 'Compiling...'
    let isProduction = compiler.options.mode === 'production'
    if(isProduction) message = "Building for Production..."
    log(chalk.bgGreen.black(` ${message} `))
  }

  const complete = stats => {
    clear()
    const isProduction = stats.compilation.options.mode === 'production'
    const messages = format(stats)
    const sec = (stats.endTime - stats.startTime) / 1000
    
    if (messages.errors.length) {
      return log(`💀  ${chalk.bgRed.black(` Oops! Something went wrong! `)} \n ${messages.errors} \n`)
    }

    if (messages.warnings.length) {
      return log(`🤯  ${chalk.bgRed.black(` Compiled with warnings. `)} \n ${messages.warnings} \n`)
    }

    const files = Object.keys(stats.compilation.assets)
    let string = chalk.dim('\n   The following files have been created! \n')
    string += isProduction ? '\n' : chalk.dim('   We\'re still watching your files \n\n')
    const assets = files.reduce((acc, curr) => (acc += `   📦  ${curr} \n`) && acc, string)
    log(`🚀  ${chalk.bgGreen.black(` Completed in ${sec}s! `)} \n${assets}`) 
  }

  compiler.hooks.compile.tap('webpack-messages', _ => clear() && start())
  compiler.hooks.invalid.tap('webpack-messages', _ => clear() && start())
  compiler.hooks.done.tap('webpack-messages', complete)
}