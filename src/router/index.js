import Router from 'vue-router'
import Vue from 'vue'



Vue.use(Router)
export const createRouter = () => {
  return new Router({
    mode: 'hash',
    routes: [{
      name: 'home',
      path: '/',
      component: () => import('../views/Home.vue')
    }]
  })
}