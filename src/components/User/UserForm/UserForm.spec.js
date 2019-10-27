import { render, cleanup, fireEvent } from '@testing-library/vue';
import '@testing-library/jest-dom/extend-expect';
import vuetify from '@/plugins/vuetify';

import UserForm from '.';

afterEach(cleanup);

const props = {
  roles: [{ name: 'SUPER_ADMIN', permissions: ['documents.users.get'] }],
};

const renderUserForm = (options = {}) => {
  const utils = render(UserForm, { ...options, vuetify });
  const getSelectableItemsList = () => utils.getByTestId('selectable-items-list');
  const getFirstRoleCheckbox = () => getSelectableItemsList().querySelector('tbody div');
  const getPermissionsTable = () => utils.getByTestId('permissions-table');
  const getNumberOfPermissions = () => getPermissionsTable().querySelectorAll('tr td').length;


  return {
    ...utils,
    getSelectableItemsList,
    getFirstRoleCheckbox,
    getPermissionsTable,
    getNumberOfPermissions,
  };
};

test('permissions are updated when a role is selected', async () => {
  const { getFirstRoleCheckbox, getNumberOfPermissions } = renderUserForm({ props });
  expect(getNumberOfPermissions()).toBe(0);

  await fireEvent.click(getFirstRoleCheckbox());

  expect(getNumberOfPermissions()).toBe(1);
});
