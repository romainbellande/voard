import { render, cleanup, fireEvent } from '@testing-library/vue';
import '@testing-library/jest-dom/extend-expect';
import vuetify from '@/plugins/vuetify';
import Signin from '.';

afterEach(cleanup);

const renderSignin = (options = {}) => {
  const utils = render(Signin, { ...options, vuetify });
  const getByTestId = item => utils.getByTestId(`signin-${item}`);
  const getSubmitButton = () => getByTestId('submit');
  const getEmailInput = () => utils.getByLabelText('Email');
  const getPasswordInput = () => utils.getByLabelText('Password');


  return {
    ...utils,
    getSubmitButton,
    getEmailInput,
    getPasswordInput,
  };
};

test('submit form', async () => {
  const onSubmitSpy = jest.fn(() => new Promise(resolve => resolve()));
  const {
    getEmailInput,
    getPasswordInput,
    getSubmitButton,
  } = renderSignin({ props: { onSubmit: onSubmitSpy } });
  await fireEvent.update(getEmailInput(), 'jdoe@example.com');
  await fireEvent.update(getPasswordInput(), 'jdoe');
  await fireEvent.click(getSubmitButton());
  expect(onSubmitSpy).toHaveBeenCalled();
});
