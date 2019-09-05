import Vue from 'vue';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';

import './firebase';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(VueMaterial);
console.log('process.env.FIREBASE_APIKEY', process.env.VUE_APP_FIREBASE_APIKEY);


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
