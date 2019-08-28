const webpack = require('webpack');
// const WebpackDevServer = require('webpack-dev-server');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
// const devConfig = require(path.resolve(__dirname, './webpack.dev'));

const { isBuiltDll } = require(path.resolve(__dirname, './dll.config.json'));

if (isBuiltDll) {
  // 直接构建
  // runDev();
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
      // runDev();
    });
  })
}

// function runDev() {
//   const server = new WebpackDevServer(webpack(devConfig), devConfig.devServer);
//   server.listen(devConfig.devServer.port || null);
// }
