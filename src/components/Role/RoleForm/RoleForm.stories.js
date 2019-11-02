/* eslint-disable import/first */
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import RoleForm from '.';
import markdown from './RoleForm.md';

storiesOf('Role/RoleForm', module)
  .add('default', () => ({
    components: { RoleForm },
    template: '<RoleForm :all-permissions="allPermissions" @submit="onSubmit" />',
    methods: {
      onRemove: action('onRemove'),
      onSubmit: action('onSubmit'),
    },
    data() {
      return {
        allPermissions: ['documents.users.get', 'documents.users.create', 'documents.users.put', 'documents.users.delete'],
      };
    },
  }), { notes: { markdown } });
