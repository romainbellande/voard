/* eslint-disable import/first */
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import UserIdentityForm from '.';
import markdown from './UserIdentityForm.md';

storiesOf('UserIdentityForm', module)
  .add('default', () => ({
    components: { UserIdentityForm },
    template: '<UserIdentityForm @submit="action" display-name="john" />',
    methods: { action: action('submit') },
  }), { notes: { markdown } });
