/* eslint-disable import/first */
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import Signin from '.';
import markdown from './Signin.md';

storiesOf('Signin', module)
  .add('default', () => ({
    components: { Signin },
    template: '<Signin :on-submit="action"  />',
    methods: {
      action: () => new Promise((resolve) => {
        action('submit');
        resolve();
      }),
    },
  }), { notes: { markdown } });
