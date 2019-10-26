import { render, cleanup } from '@testing-library/vue';
import '@testing-library/jest-dom/extend-expect';
import vuetify from '@/plugins/vuetify';
import AppPage from '.';

afterEach(cleanup);

const renderAppPage = (options = {}) => {
  const utils = render(AppPage, { ...options, vuetify });
  const getLoading = () => utils.queryByTestId('loading');


  return {
    ...utils,
    getLoading,
  };
};

test('don\'t render loading component by defaultt', () => {
  const { getLoading } = renderAppPage();

  expect(getLoading()).toBeNull();
});

test('render loading component', () => {
  const { getLoading } = renderAppPage({ props: { loading: true } });

  expect(getLoading()).toBeVisible();
});
