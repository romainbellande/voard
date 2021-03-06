import firebase from 'firebase/app';

const adminBaseURL = 'app/users';

export default {
  async fetchOne(authId) {
    const { data } = await firebase.functions().httpsCallable(`${adminBaseURL}/${authId}`)();
    return data;
  },
  async fetchAll() {
    const { data } = await firebase.functions().httpsCallable(adminBaseURL)();
    return data;
  },
  async update(authId, body) {
    const { data } = await firebase.functions().httpsCallable(`${adminBaseURL}/${authId}/update`)(body);
    return data;
  },
  async create(body) {
    const { data } = await firebase.functions().httpsCallable(`${adminBaseURL}/create`)(body);
    return data;
  },
  fetchDetails(userId) {
    return firebase.firestore().collection('users')
      .doc(userId)
      .get()
      .then(snapshot => ({ ...snapshot.data(), id: document.id }));
  },
  async updateDetails(userId, body) {
    return firebase.firestore().collection('users')
      .doc(userId)
      .update(body);
  },
  async createDetails(userId, { roles, permissions }) {
    return firebase.firestore().collection('users').doc(userId).set({ roles, permissions });
  },
};
