import Vue from 'vue';
import '@mdi/font/css/materialdesignicons.css';

import './firebase';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import registrator from './registrator';

registrator();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
