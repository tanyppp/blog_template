const webpack = require('webpack');
const chalk = require('chalk');
const ora = require('ora');
const path = require('path');
const fs = require('fs');
const prodConfig = require(path.resolve(__dirname, './webpack.prod'));
let { isBuiltDll } = require(path.resolve(__dirname, './dll.config.json'));

const spinner = new ora();
spinner.color = 'blue';

try {
  const arr = fs.readdirSync(path.resolve(__dirname, '../dist/js'));
  if (arr.includes('dll')) {
    isBuiltDll = true;
  } else {
    isBuiltDll = false;
  }
} catch(e) {
  isBuiltDll = false;
}

if (isBuiltDll) {
  // 直接构建
  runBuild();
} else {
  // 先构建dll
  const dllConfig = require(path.resolve(__dirname, './webpack.dll'));
  spinner.start('building dll...');
  webpack(dllConfig, (err) => {
    if (err) {
      spinner.fail();
      console.log(chalk.red('build dll fail!'));
      throw err;
    }
    spinner.succeed();
    console.log(chalk.green('build dll success!'));
    runBuild();
  })
}

function runBuild() {
  spinner.start('building for production...');
  webpack(prodConfig, (err) => {
    if (err) {
      spinner.fail();
      console.log(chalk.red('build for production fail!'));
      throw err;
    }
    spinner.succeed();
    console.log(chalk.green('build for production success!'));
  })
}
