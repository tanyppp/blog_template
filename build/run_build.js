const webpack = require('webpack');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const prodConfig = require(path.resolve(__dirname, './webpack.prod'));
const { isBuiltDll } = require(path.resolve(__dirname, './dll.config.json'));

if (isBuiltDll) {
  // 直接构建
  runBuild();
} else {
  // 先构建dll
  const dllConfig = require(path.resolve(__dirname, './webpack.dll'));
  const dllJson = {
    isBuiltDll: true
  };
  webpack(dllConfig, (err) => {
    if (err) {
      throw err;
    }
    console.log(chalk.green('build dll success!'))
    fs.writeFile(path.resolve(__dirname, './dll.config.json'), JSON.stringify(dllJson, null, '\t'), (err) => {
      if (err) {
        throw err;
      }
      runBuild();
    });
  })
}

function runBuild() {
  webpack(prodConfig, (err) => {
    if (err) {
      throw err;
    }
    console.log(chalk.green('build for production success!'));
  })
}
