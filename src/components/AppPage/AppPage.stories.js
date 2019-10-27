/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';

import AppPage from '.';
import markdown from './AppPage.md';

storiesOf('AppPage', module)
  .add('default', () => ({
    components: { AppPage },
    template: '<app-page>My Page</app-page>',
  }), { notes: { markdown } })
  .add('loading', () => ({
    components: { AppPage },
    template: '<app-page :loading="true">My Page</app-page>',
  }), { notes: { markdown } });
