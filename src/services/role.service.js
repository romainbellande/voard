import firebase from 'firebase/app';

export default {
  fetchAll() {
    return firebase.firestore().collection('roles')
      .get()
      .then(querySnapshot => querySnapshot.docs.map(doc => doc.data()));
  },
};
