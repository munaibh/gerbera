module.exports = (args, rawArgs) => {
  const selectedCommand = args[0]
  const availableCommands = ['create', 'serve', 'build']
  const isValidCommand = availableCommands.includes(selectedCommand)
  
  if(isValidCommand) {
    return require(`./${selectedCommand}`)(args, rawArgs)
  }

  console.log('Please enter a valid command.')
}