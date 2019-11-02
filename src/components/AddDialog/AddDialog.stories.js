/* eslint-disable import/first */
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import AddDialog from '.';
import markdown from './AddDialog.md';

storiesOf('AddDialog', module)
  .add('default', () => ({
    components: { AddDialog },
    template: '<add-dialog title="My title" description="my description" :dialog="true" @close="onClose" @add="onAdd" ><div>That\'s my body</div></add-dialog>',
    methods: {
      onClose: action('onClose'),
      onAdd: action('onAdd'),
    },
  }), { notes: { markdown } });
