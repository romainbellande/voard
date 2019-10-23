/* eslint-disable import/first */
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import UserForm from '.';
import markdown from './UserForm.md';

export default {
  title: 'UserForm',
};


storiesOf('UserForm', module)
  .add('default', () => ({
    components: { UserForm },
    template: '<user-form @submit="action" display-name="john"></user-form>',
    methods: { action: action('submit') },
  }), { notes: { markdown } });
