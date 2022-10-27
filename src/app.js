import Vue from 'vue';
import App from './App.vue';
import { createRouter } from './router';
import { createStore } from './store';
import { sync } from 'vuex-router-sync';

Vue.config.productionTip = false;

export const createApp = () => {
  const router = createRouter();
  const store = createStore();

  // todo 这个之前是没有的
  // 同步路由状态(route state)到 store
  sync(store, router);

  const app = new Vue({
    router,
    store,
    render: (h) => h(App),
  });
  return { app, router, store };
};
