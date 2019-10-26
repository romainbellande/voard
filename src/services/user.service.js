import firebase from 'firebase/app';

export default {
  async fetchOne(userId) {
    const { data } = await firebase.functions().httpsCallable(`app/users/${userId}`)();
    return data;
  },
  async fetchAll() {
    const { data } = await firebase.functions().httpsCallable('app/users')();
    return data;
  },
  fetchDetails(userId) {
    return firebase.firestore().collection('users')
      .doc(userId)
      .get()
      .then(snapshot => snapshot.data());
  },
};
