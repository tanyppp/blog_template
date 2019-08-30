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
    writeDllConf(path.resolve(__dirname, './dll.config.json'), { isBuiltDll });
  }
} catch(e) {
  isBuiltDll = false;
  writeDllConf(path.resolve(__dirname, './dll.config.json'), { isBuiltDll });
}

if (isBuiltDll) {
  // 直接构建
  runBuild();
} else {
  // 先构建dll
  const dllConfig = require(path.resolve(__dirname, './webpack.dll'));
  const dllJson = {
    isBuiltDll: true
  };
  dllConfig.mode = process.env.NODE_ENV;
  spinner.start('building dll...');
  webpack(dllConfig, (err) => {
    if (err) {
      spinner.fail();
      console.log(chalk.red('build dll fail!'));
      throw err;
    }
    spinner.succeed();
    console.log(chalk.green('build dll success!'));
    fs.writeFile(path.resolve(__dirname, './dll.config.json'), JSON.stringify(dllJson, null, '\t'), (err) => {
      if (err) {
        throw err;
      }
      runBuild();
    });
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

function writeDllConf(path, value) {
  fs.writeFile(path, JSON.stringify(value, null, '\t'), (err) => {
    if (err) {
      throw err;
    }
  });
}
