import { render, cleanup, fireEvent } from '@testing-library/vue';
import '@testing-library/jest-dom/extend-expect';
import vuetify from '@/plugins/vuetify';
import SelectableItemsList from '.';

afterEach(cleanup);


const items = [
  {
    name: 'orange',
    quantity: 12,
  },
  {
    name: 'apple',
    quantity: 14,
  },
  {
    name: 'peach',
    quantity: 10,
  },
];

const headers = [
  {
    text: 'Name',
    align: 'left',
    value: 'name',
  },
  {
    text: 'Quantity',
    value: 'quantity',
  },
];

const props = {
  items,
  headers,
};

const renderSelectableItemsList = (options = {}) => {
  const utils = render(SelectableItemsList, { ...options, vuetify });
  const getByTestId = item => utils.getByTestId(`selectable-item-list-${item}`);
  const getItemsList = () => getByTestId('list');


  return {
    ...utils,
    getItemsList,
  };
};

test('insert items in list', () => {
  const { getByText } = renderSelectableItemsList({ props });
  const orangeCell = getByText('orange');
  const appleCell = getByText('apple');
  const peachCell = getByText('peach');
  expect(orangeCell).toBeVisible();
  expect(appleCell).toBeVisible();
  expect(peachCell).toBeVisible();
});

test('select an item', async () => {
  const { emitted } = renderSelectableItemsList({ props });
  const orangeCheckbox = document.body.querySelector('tbody div'); // There is no better selector currently..

  await fireEvent.click(orangeCheckbox);

  expect(emitted()).toHaveProperty('item-selected');
  expect(emitted()['item-selected'][0][0]).toMatchObject(items[0]);
});

test('select all items', async () => {
  const { emitted } = renderSelectableItemsList({ props });
  const globalCheckbox = document.body.querySelector('th div'); // There is no better selector currently..

  await fireEvent.click(globalCheckbox);

  expect(emitted()).toHaveProperty('input');
  expect(emitted().input[0][0]).toMatchObject(items);
});
