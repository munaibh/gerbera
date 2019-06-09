const clear = require('./clearConsole')
const format = require('webpack-format-messages')

module.exports = compiler => {
  const log = str => console.log(str)
  const start = _ => log(`Compiling...`)

  const complete = stats => {
    clear()
    const messages = format(stats)
    const sec = (stats.endTime - stats.startTime) / 1000
    
    if (messages.errors.length) {
      return log(`Failed to compile! \n ${messages.errors}`)
    }

    if (messages.warnings.length) {
      return log(`Compiled with warnings. \n ${messages.warnings}`)
    }

    log(`Completed in ${sec}s!`) 
  }

  compiler.hooks.compile.tap('webpack-messages', _ => clear() && start())
  compiler.hooks.invalid.tap('webpack-messages', _ => clear() && start())
  compiler.hooks.done.tap('webpack-messages', complete)
}