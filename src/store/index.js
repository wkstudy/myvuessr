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
      setItem(state, { id, item }) {
        Vue.set(state.items, id, item);
      },
    },
    actions: {
      fetchItem({ commit }, id) {
        // todo
        // return axios.get('http://localhost:3000/api/getItem').then(({ data }) => {
        //   commit('setItem', { id, data });
        // });
        return Promise.resolve().then(() => {
          commit('setItem', { id, item: { a: 2 } });
        });
      },
    },
  });
};
