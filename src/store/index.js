import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import { getItem } from '../api';
export const createStore = () => {
  return new Vuex.Store({
    state: {
      items: {},
    },
    mutations: {
      setItem(state, obj) {
        Vue.set(state.items, 'test', obj);
      },
    },
    actions: {
      fetchItem({ commit }) {
        // todo
        return axios.get('http://localhost:3000/api/getItem').then(({ data }) => {
          console.log(data, 'data');
          commit('setItem', data);
        });
        // return Promise.resolve().then(() => {
        //   commit('setItem', { id, item: { a: 2 } });
        // });
      },
    },
  });
};
