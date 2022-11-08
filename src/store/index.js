import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// import { getItem } from '../api';
export const createStore = () => {
  return new Vuex.Store({
    state: {
      items: {
        test: {},
        level: [],
      },
    },
    mutations: {
      setItem(state, obj) {
        Vue.set(state.items, 'test', obj);
      },
      setLevel(state, arr) {
        Vue.set(state.items, 'level', arr);
      },
    },
    actions: {
      fetchItem({ commit }) {
        return axios.get('http://localhost:3000/api/getItem').then(({ data }) => {
          commit('setItem', data);
        });
        // return Promise.resolve().then(() => {
        //   commit('setItem', { id, item: { a: 2 } });
        // });
      },
      fetchLevel({ commit }) {
        return axios.get('http://localhost:3000/api/getLevel').then(({ data }) => {
          commit('setLevel', data);
        });
        // return Promise.resolve().then(() => {
        //   commit('setItem', { id, item: { a: 2 } });
        // });
      },
    },
  });
};
