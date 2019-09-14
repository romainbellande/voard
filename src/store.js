import Vue from 'vue';
import Vuex from 'vuex';
import { vuexfireMutations, firestoreAction } from 'vuexfire';
import firebase from 'firebase';

Vue.use(Vuex);

export const collections = {
  EQUIPMENTS: 'equipments',
  USER: 'user',
  USERS: 'users',
  ROLES: 'roles',
  PERMISSIONS: 'permissions',
};

const createAction = actionName => firestoreAction(
  (context, ref) => {
    // this will unbind any previously bound ref to 'todos'
    context.bindFirestoreRef(actionName, ref);
  },
);


const setEquipmentsRef = createAction(collections.EQUIPMENTS);
const setUserRef = createAction(collections.USER);
const setRolesRef = createAction(collections.ROLES);
const setPermissionsRef = createAction(collections.PERMISSIONS);
const setUsersRef = createAction(collections.USERS);

export const actions = {
  setEquipmentsRef: 'setEquipmentsRef',
  setUserRef: 'setUserRef',
  setRolesRef: 'setRolesRef',
  setPermissionsRef: 'setPermissionsRef',
  setUsersRef: 'setUsersRef',
};

const db = firebase.firestore();

export class FirestoreManager {
  constructor(store) {
    this.store = store;
  }

  initCollection(action, collection) {
    this.store.dispatch(action, db.collection(collection));
  }

  init(collectionsName = []) {
    return collectionsName.map(collection => this.collectionsInitialized()[collection]());
  }

  collectionsInitialized() {
    return {
      roles: () => {
        this.initCollection(actions.setRolesRef, collections.ROLES);
      },
      permissions: () => {
        this.initCollection(actions.setPermissionsRef, collections.PERMISSIONS);
      },
      equipments: () => {
        this.initCollection(actions.setEquipmentsRef, collections.EQUIPMENTS);
      },
      users: () => {
        this.initCollection(actions.setUsersRef, collections.USERS);
      },
    };
  }
}

export const initialize = (store) => {
  const firestoreManager = new FirestoreManager(store);
  firestoreManager.init(['roles', 'permissions', 'equipments']);
};


export default new Vuex.Store({
  state: {
    roles: [],
    permissions: [],
    equipments: [],
    users: [],
    user: null,
  },
  mutations: {
    ...vuexfireMutations,
  },
  actions: {
    [actions.setEquipmentsRef]: setEquipmentsRef,
    [actions.setUserRef]: setUserRef,
    [actions.setRolesRef]: setRolesRef,
    [actions.setPermissionsRef]: setPermissionsRef,
    [actions.setUsersRef]: setUsersRef,
  },
  getters: {
    roles: state => state.roles,
    permissions: state => state.permissions,
    users: state => state.users,
    equipments: state => state.equipments,
  },
});
