/* eslint-disable import/first */
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import SelectableItemsList from '.';
import markdown from './SelectableItemsList.md';

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

storiesOf('SelectableItemsList', module)
  .add('default', () => ({
    components: { SelectableItemsList },
    template: '<SelectableItemsList :headers="headers" :items="items" @input="onInput" @item-selected="onItemSelected"  />',
    data() {
      return {
        items,
        headers,
      };
    },
    methods: {
      onItemSelected: action('on item selected'),
      onInput: action('on input'),
    },
  }), { notes: { markdown } })
  .add('with default selection', () => ({
    components: { SelectableItemsList },
    template: '<SelectableItemsList :headers="headers" :items="items" :selected-items="[items[0]]" @input="onInput" />',
    data() {
      return {
        items,
        headers,
      };
    },
    methods: {
      onInput: action('on input'),
    },
  }), { notes: { markdown } });
