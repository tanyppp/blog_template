const webpack = require('webpack');
// const WebpackDevServer = require('webpack-dev-server');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
// const devConfig = require(path.resolve(__dirname, './webpack.dev'));

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
  // runDev();
} else {
  // 先构建dll
  const ora = require('ora');
  const spinner = new ora('building dll...');
  const dllConfig = require(path.resolve(__dirname, './webpack.dll'));
  spinner.color = 'blue';
  spinner.start();
  webpack(dllConfig, (err) => {
    spinner.stop();
    if (err) {
      throw err;
    }
    console.log(chalk.green('build dll success!'));
  })
}
// function runDev() {
//   const server = new WebpackDevServer(webpack(devConfig), devConfig.devServer);
//   server.listen(devConfig.devServer.port || null);
// }
