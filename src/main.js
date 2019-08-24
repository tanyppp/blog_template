import App from './App'
import Vue from 'vue'
import store from './store'
import router from './router'

/**
 * Tips:
 * 1.配置的EsLint要求不使用分号
 * 2.使用scss语法开发更高效
 * 3.该文件是入口文件，可以引入一些全局的组件、样式、js文件
 * 4.static目录下的文件不会被打包，而是被复制到打包后的dist目录下，所以可以直接通过/static访问static下的资源（如图片、样式）
 */

// 重写es6方法，兼容作用
import '@babel/polyfill'

// ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#root')
