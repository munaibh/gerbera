const fs = require('fs')
const template = require('ejs')

const createOutputDirectory = (output) => {
  if (fs.existsSync(output)) throw new Error('Path already exists.')
  fs.mkdirSync(output)
}

const copyFilesAndDirectories = (source, output, data) => {
  const sourceFiles = fs.readdirSync(source)

  sourceFiles.forEach(file => {
    const filePath = `${source}/${file}`
    const fileStat = fs.statSync(filePath)
    const outputPath = `${output}/${file}`

    if (fileStat.isFile()) {
      const fileContent = fs.readFileSync(filePath, 'utf8')
      const renderedContent = template.render(fileContent, data)
      fs.writeFileSync(outputPath, renderedContent, 'utf8')
      return
    }

    if (fileStat.isDirectory()) {
      fs.mkdirSync(outputPath)
      copyFilesAndDirectories(filePath, outputPath, data)
      return
    }
  })
}

module.exports = (source, output, data) => {
  createOutputDirectory(output)
  copyFilesAndDirectories(source, output, data)
}