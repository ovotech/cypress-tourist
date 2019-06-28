const fs = require('fs')
const rimrafSync = require('rimraf').sync

exports.resetDirectory = filePath => {
  rimrafSync(filePath)
  fs.mkdirSync(filePath)
}
