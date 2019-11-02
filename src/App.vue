<template>
  <router-view />
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'App',
  data: () => ({
    //
  }),
  beforeCreate() {
    this.$router.beforeEach((to, from, next) => {
      if (to.matched.some(record => record.meta.auth)) {
        firebase.auth().onAuthStateChanged((user) => {
          if (!user) {
            next({
              path: '/',

            });
          } else {
            next();
          }
        });
      } else next();
    });

    firebase.auth().onAuthStateChanged((user) => {
      this.$store.commit('setUser', user);
      this.$store.dispatch('bindUserDetails', user.uid);

      if (user && this.$router.name === 'login') {
        // User is signed in.
        this.$router.push({ name: 'home' });
      } else if (!user && this.$router.name !== 'login') {
        // No user is signed in.
        this.$router.push({ name: 'login' });
      }
    });
  },
};
</script>
