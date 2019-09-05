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
      const { user } = this.$store.state;
      const withAuth = to.matched.some(record => record.meta.auth);
      if (withAuth && !user) {
        next('login');
      }
      next();
    });

    firebase.auth().onAuthStateChanged((user) => {
      this.$store.commit('setUser', user);
      console.log('user', user);
      console.log('router.path', this.$router.path);
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
