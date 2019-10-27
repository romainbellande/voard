/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';

import AppLoading from '.';
import markdown from './AppLoading.md';

storiesOf('AppLoading', module)
  .add('default', () => ({
    components: { AppLoading },
    template: '<AppLoading />',
  }), { notes: { markdown } });
