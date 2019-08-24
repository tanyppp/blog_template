import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 动态引入
const Home = () => import(
  /* webpackChunkName: "Home" */
  /* webpackMode: "lazy" */
  '@/pages/home/home'
)

const About = () => import(
  /* webpackChunkName: "About" */
  /* webpackMode: "lazy" */
  '@/pages/about/about'
)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      component: Home
    },
    {
      path: '/about',
      component: About
    }
  ]
})
