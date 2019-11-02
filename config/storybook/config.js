/* eslint-disable import/no-extraneous-dependencies */
import { configure, addDecorator } from '@storybook/vue';
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/dist/vuetify.min.css';
import { VApp } from 'vuetify/lib';
import { withInfo } from 'storybook-addon-vue-info';

import vuetify from '../../src/plugins/vuetify';

// Ensures every story is wrapped in a v-app tag
addDecorator(() => ({
  vuetify,
  components: { VApp },
  template: '<v-app><story/></v-app>',
}));

addDecorator(withInfo);

const req = require.context('@', true, /.stories.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
