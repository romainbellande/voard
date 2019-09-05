<template>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script>
import firebase from 'firebase';

export default {
  beforeCreate() {
    // console.log('this.$router', this.$router)
    this.$router.beforeEach((to, from, next) => {
      // console.log('firebase', firebase);
      const { currentUser } = firebase.auth();
      console.log('currentUser', currentUser);
      const withAuth = to.matched.some(record => record.meta.auth);
      if (withAuth && !currentUser) {
        next('login');
      }
      next();
    });

    firebase.auth().onAuthStateChanged((user) => {
      console.log('user', user);
      console.log('router.path', this.$router.path);
      if (user && this.$router.path === '/login') {
        // User is signed in.
        this.$router.push('/');
        console.log('user', user);
      } else if (!user && this.$router.path !== '/login') {
        this.$router.push('/login');
        // No user is signed in.
      }
    });
  },
};
</script>
