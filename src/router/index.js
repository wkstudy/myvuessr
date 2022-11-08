import VueRouter from 'vue-router';
import Vue from 'vue';
Vue.use(VueRouter);
export const createRouter = () => {
  return new VueRouter({
    mode: 'history',
    routes: [
      {
        name: 'home',
        path: '/',
        component: () => import('../views/Home.vue'),
      },
      {
        name: 'about',
        path: '/about',
        component: () => import('../views/About.vue'),
      },
    ],
  });
};
