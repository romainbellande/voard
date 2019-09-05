<template>
  <div>
    <div id="signin"></div>
  </div>
</template>

<script>
import firebase from 'firebase';
import * as firebaseui from 'firebaseui';

const ui = new firebaseui.auth.AuthUI(firebase.auth());

const uiConfig = {
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  signInSuccessUrl: '/',
  callbacks: {
    signInSuccessWithAuthResult(authResult, redirectUrl) {
      console.log('authResult', authResult);
      console.log('redirectUrl', redirectUrl);
      return true;
    },
  },
};

export default {
  mounted() {
    // console.log('firebase', firebase.auth());
    ui.start('#signin', uiConfig);
  },
};
</script>

<style>

</style>
