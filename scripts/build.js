const fse = require('fs-extra')
const path = require('path')


let callback, inputFilename, outputFilename

inputFilename = path.resolve(__dirname, '..', 'src', 'Layer.css')
outputFilename = path.resolve(__dirname, '..', 'dist', 'styles', 'Layer.css')
callback = function (err) {
  if (err) {
    console.error(err)
  }
}
fse.copy(inputFilename, outputFilename)
    .catch(callback)
