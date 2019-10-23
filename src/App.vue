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
            this.$store.commit('setUser', user);
            next();
          }
        });
      } else next();
    });

    firebase.auth().onAuthStateChanged((user) => {
      this.$store.commit('setUser', user);
      if (user && this.$router.path === '/login') {
        // User is signed in.
        this.$router.push('/');
      } else if (!user && this.$router.path !== '/login') {
        // No user is signed in.
        this.$router.push('/login');
      }
    });
  },
};
</script>
