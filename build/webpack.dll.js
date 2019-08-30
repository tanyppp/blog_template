const path = require('path');
const webpack = require('webpack');

// 动态链接库
module.exports = {
  entry: {
    vue: ['vue', 'vue-router', 'vuex'],
    element_ui: ['element-ui'],
    polyfill: ['@babel/polyfill']
  },
  output: {
    filename: '[name].dll.js',
    path: path.resolve('dist', 'js', 'dll'),
    library: '_dll_[name]',
    libraryTarget: 'var'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '_dll_[name]',
      path: path.resolve('dist', 'js', 'dll', '[name].manifest.json')
    })
  ]
}
