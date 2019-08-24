const fs = require('fs')
const config = require('./config')

const webDirs = fs.readdirSync(config.web_path)
const m = new Map()

webDirs.forEach(function (fileName) {
  const path = require(config.web_path + '/' + fileName)
  if (Object.prototype.toString.call(path) !== '[object Map]') {
    throw new Error('导出的数据必须是Map类型：' + fileName)
  }
  for (const [k, v] of path) {
    m.set(k, v)
  }
})

module.exports = m
