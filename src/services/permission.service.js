import firebase from 'firebase/app';

export default {
  fetchAll() {
    return firebase.functions().httpsCallable('app/permissions')();
  },
};
