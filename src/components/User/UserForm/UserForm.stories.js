/* eslint-disable import/first */
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import UserForm from '.';
import markdown from './UserForm.md';

const roles = [{ name: 'SUPER_ADMIN', permissions: ['documents.get.users'] }, { name: 'EDITOR', permissions: ['documents.update.roles'] }];

storiesOf('UserForm', module)
  .add('create mode (default)', () => ({
    components: { UserForm },
    template: '<UserForm @submit="onSubmit" :roles="roles" />',
    methods: {
      onSubmit: action('submit'),
    },
    data() {
      return {
        roles,
      };
    },
  }), { notes: { markdown } })
  .add('edit mode', () => ({
    components: { UserForm },
    template: '<UserForm @submit="onSubmit" :roles="roles"  :edit-mode="true" :user="user" :default-selected-roles="defaultSelectedRoles"  />',
    methods: {
      onSubmit: action('submit'),
    },
    data() {
      return {
        roles,
        user: {
          displayName: 'John Doe',
          email: 'jdoe@example.com',
          phoneNumber: '0623132123',
          disabled: false,
        },
        defaultSelectedRoles: [roles[0]],
      };
    },
  }), { notes: { markdown } });
