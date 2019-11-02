import { render, cleanup, fireEvent } from '@testing-library/vue';
import vuetify from '@/plugins/vuetify';
import RoleForm from '.';

afterEach(cleanup);

const props = {
  allPermissions: ['documents.users.get'],
};

const renderRoleForm = (options = {}) => {
  const utils = render(RoleForm, { ...options, vuetify });
  const getNameInput = () => utils.getByLabelText('name');
  const getAddPermissionsButton = () => utils.getByTestId('add-permission-button');
  const getDialogPermissionList = () => utils.queryByTestId('selectable-items-list');
  const getDialogFirstPermissionCheckbox = () => getDialogPermissionList().querySelector('tbody div');
  const getAddDialogButton = () => utils.getByTestId('dialog-add-button');
  const getPermissionList = () => utils.getByTestId('role-permissions');
  const getNumberOfPermission = () => getPermissionList().querySelectorAll('tbody tr').length;
  const getSubmitRoleButton = () => utils.getByTestId('submit-role-button');


  return {
    ...utils,
    getNameInput,
    getAddPermissionsButton,
    getDialogPermissionList,
    getDialogFirstPermissionCheckbox,
    getAddDialogButton,
    getPermissionList,
    getNumberOfPermission,
    getSubmitRoleButton,
  };
};

test('open permission list', async () => {
  const {
    getDialogPermissionList,
    getAddPermissionsButton,
    getDialogFirstPermissionCheckbox,
  } = renderRoleForm({ props });

  expect(getDialogPermissionList()).toBeNull();

  await fireEvent.click(getAddPermissionsButton());

  expect(getDialogPermissionList()).toBeVisible();
  expect(getDialogFirstPermissionCheckbox()).toBeVisible();
});

test('save role', async () => {
  const {
    getNameInput,
    getAddPermissionsButton,
    getAddDialogButton,
    getNumberOfPermission,
    getSubmitRoleButton,
    getDialogFirstPermissionCheckbox,
    emitted,
  } = renderRoleForm({ props });

  await fireEvent.update(getNameInput(), 'SUPER_ADMIN');
  await fireEvent.click(getAddPermissionsButton());
  await fireEvent.click(getDialogFirstPermissionCheckbox());
  await fireEvent.click(getAddDialogButton());

  expect(getNumberOfPermission()).toBe(1);

  await fireEvent.click(getSubmitRoleButton());

  expect(emitted()).toHaveProperty('submit');
  expect(emitted().submit[0][0]).toMatchObject({ name: 'SUPER_ADMIN', permissions: [props.allPermissions[0]] });
});
