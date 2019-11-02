/* eslint-disable import/first */
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import RoleList from '.';

storiesOf('Role/RoleList', module)
  .add('default', () => ({
    components: { RoleList },
    template: '<RoleList @remove="onRemove" :items="roles" />',
    methods: {
      onRemove: action('onRemove'),
    },
    data() {
      return {
        roles: [{ name: 'SUPER_ADMIN', permissions: ['documents.users.get'] }],
      };
    },
  }), { info: { summary: 'Simple role list with deletion capability.' } });
