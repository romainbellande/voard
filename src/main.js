import Vue from 'vue';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';

import './firebase';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

console.log('process.env.FIREBASE_APIKEY', process.env.VUE_APP_FIREBASE_APIKEY);


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
