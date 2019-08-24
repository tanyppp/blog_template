const fs = require('fs')

const configArr = fs.readFileSync('./service.conf').toString().split("\n")
const configObj = {}
configArr.reduce(function (prev, next) {
  const arr = next.split('=')
  if (arr.length !== 2) return prev
  prev[arr[0]] = arr[1]
  return prev
}, configObj)

module.exports = configObj
