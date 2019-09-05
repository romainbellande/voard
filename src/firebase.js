import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/firebase-functions';
import 'firebase/firebase-storage';
import 'firebase/messaging';
import config from './config';

const firebaseConfig = {
  apiKey: config.FIREBASE_APIKEY,
  authDomain: config.FIREBASE_AUTH_DOMAIN,
  databaseURL: config.FIREBASE_DATABASE_URL,
  projectId: config.FIREBASE_PROJECT_ID,
  storageBucket: config.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: config.FIREBASE_MESSAGE_SENDER_ID,
  appID: config.FIREBASE_APP_ID,
};

firebase.initializeApp(firebaseConfig);

export default firebase;
