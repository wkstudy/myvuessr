import Vue  from "vue";
import Vuex from 'vuex';

Vue.use(Vuex)

import {getItem} from '../api'
export const createStore = () => {
  return new Vuex.Store({
    state: {
      items: {}
    },
    mutations: {
      setItem(state, {id, item}) {
        Vue.set(state.items, id, item)
      }
    },
    actions: {
      fetchItem({commit}, id) {

        return getItem(id).then((res) => {
          commit('setItem', {id, res})
        })
      }
    }
  })
}