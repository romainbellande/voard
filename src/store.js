import Vue from 'vue';
import Vuex from 'vuex';
import { vuexfireMutations, firestoreAction } from 'vuexfire';

Vue.use(Vuex);

const setEquipmentRef = firestoreAction(
  (context, ref) => {
    // this will unbind any previously bound ref to 'todos'
    context.bindFirestoreRef('equipment', ref);
  },
);

export default new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    ...vuexfireMutations,
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    setEquipmentRef,
  },
});
