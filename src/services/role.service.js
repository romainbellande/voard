import firebase from 'firebase/app';

const ROLE_COLLECTION = 'roles';

const getRoleCollection = () => firebase.firestore().collection(ROLE_COLLECTION);

export default {
  fetchAll() {
    return getRoleCollection()
      .get()
      .then(querySnapshot => querySnapshot.docs.map(doc => doc.data()));
  },
  add(role) {
    return getRoleCollection()
      .add(role);
  },
  delete(roleId) {
    return getRoleCollection().doc(roleId).delete();
  },
};
