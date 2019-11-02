import { render, cleanup, fireEvent } from '@testing-library/vue';
import vuetify from '@/plugins/vuetify';
import PermissionList from '.';

afterEach(cleanup);


const items = [
  'documents.users.get',
  'document.users.create',
  'documents.user.delete',
];

const props = {
  items,
};

const renderPermissionList = (options = {}) => {
  const utils = render(PermissionList, { ...options, vuetify });
  const getByTestId = item => utils.getByTestId(`selectable-item-list-${item}`);
  const getItemsList = () => getByTestId('list');


  return {
    ...utils,
    getItemsList,
  };
};

test('insert items in list', () => {
  const { getByText } = renderPermissionList({ props });
  const firstCell = getByText(items[0]);
  const secondCell = getByText(items[1]);
  const thirdCell = getByText(items[2]);
  expect(firstCell).toBeVisible();
  expect(secondCell).toBeVisible();
  expect(thirdCell).toBeVisible();
});

test('select all items', async () => {
  const { emitted } = renderPermissionList({ props });
  const globalCheckbox = document.body.querySelector('th div'); // There is no better selector currently..

  await fireEvent.click(globalCheckbox);

  expect(emitted()).toHaveProperty('input');
  expect(emitted().input[0][0]).toMatchObject(items);
});
