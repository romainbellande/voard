/* eslint-disable import/first */
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import PermissionList from '.';
import markdown from './PermissionList.md';

const permissions = ['documents.users.get', 'documents.users.create', 'documents.users.list'];

storiesOf('Permission/PermissionList', module)
  .add('default', () => ({
    components: { PermissionList },
    template: '<PermissionList @input="onInput" :items="permissions" />',
    methods: {
      onInput: action('onInput'),
    },
    data() {
      return {
        permissions,
      };
    },
  }), { notes: { markdown } })
  .add('with selected permissions', () => ({
    components: { PermissionList },
    template: '<PermissionList @input="onInput" :items="permissions" :selected-items="selectedItems" />',
    methods: {
      onInput: action('onInput'),
    },
    data() {
      return {
        permissions,
        selectedItems: [permissions[0]],
      };
    },
  }), { notes: { markdown } });
