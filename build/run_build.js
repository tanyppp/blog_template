const webpack = require("webpack");
const chalk = require("chalk");
const ora = require("ora");
const path = require("path");
const fs = require("fs");
const prodConfig = require(path.resolve(__dirname, "./webpack.prod"));
let lastIsProd = require("./env.json").env === process.env.NODE_ENV;

const spinner = new ora();
spinner.color = "blue";

let isBuiltDll = true;
try {
  const arr = fs.readdirSync(path.resolve(__dirname, "../dist/js"));
  if (arr.includes("dll")) {
    isBuiltDll = true;
  } else {
    isBuiltDll = false;
  }
} catch (e) {
  isBuiltDll = false;
}

if (isBuiltDll && lastIsProd) {
  runBuild();
} else {
  fs.writeFile(
    path.resolve(__dirname, "./env.json"),
    JSON.stringify({ env: "production" }, null, "\t"),
    err => {
      if (err) throw err;
      const dllConfig = require(path.resolve(__dirname, "./webpack.dll"));
      spinner.start("building dll...");
      webpack(dllConfig, err => {
        if (err) {
          spinner.fail();
          console.log(chalk.red("build dll fail!"));
          throw err;
        }
        spinner.succeed();
        console.log(chalk.green("build dll success!"));
        runBuild();
      });
    }
  );
}

function runBuild() {
  spinner.start("building for production...");
  webpack(prodConfig, err => {
    if (err) {
      spinner.fail();
      console.log(chalk.red("build for production fail!"));
      throw err;
    }
    spinner.succeed();
    console.log(chalk.green("build for production success!"));
  });
}
