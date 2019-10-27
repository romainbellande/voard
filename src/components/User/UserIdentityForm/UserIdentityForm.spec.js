import { render, cleanup, fireEvent } from '@testing-library/vue';
import '@testing-library/jest-dom/extend-expect';
import vuetify from '@/plugins/vuetify';
import UserIdentityForm from '.';

afterEach(cleanup);

const props = {
  displayName: 'jdoe',
  phoneNumber: '+33612312312',
  email: 'jdoe@example.com',
  disabled: true,
  editMode: true,
};

const renderUserIdentityForm = (options = {}) => {
  const utils = render(UserIdentityForm, { ...options, vuetify });
  const getByTestId = item => utils.getByTestId(`user-form-${item}`);
  const getDisplayNameInput = () => getByTestId('displayname');
  const getPhoneNumberInput = () => getByTestId('phonenumber');
  const getEmailInput = () => getByTestId('email');
  const getDisabledInput = () => getByTestId('disabled');
  const getSubmitButton = () => getByTestId('submit');

  return {
    ...utils,
    getDisabledInput,
    getPhoneNumberInput,
    getDisplayNameInput,
    getEmailInput,
    getSubmitButton,
  };
};

test('displayName can be initialized', () => {
  const { getDisplayNameInput } = renderUserIdentityForm({ props });
  expect(getDisplayNameInput()).toHaveValue(props.displayName);
});

test('email can be initialized', () => {
  const { getEmailInput } = renderUserIdentityForm({ props });
  expect(getEmailInput()).toHaveValue(props.email);
});

test('phoneNumber can be initialized', () => {
  const { getPhoneNumberInput } = renderUserIdentityForm({ props });
  expect(getPhoneNumberInput()).toHaveValue(props.phoneNumber);
});

test('disabled can be initialized', () => {
  const { getDisabledInput } = renderUserIdentityForm({ props });
  expect(getDisabledInput().checked).toBe(props.disabled);
});

test('submit form values', async () => {
  const { getSubmitButton, emitted } = renderUserIdentityForm({ props });
  const submitButton = getSubmitButton();

  expect(submitButton).toBeEnabled();

  await fireEvent.click(submitButton);
  expect(emitted()).toHaveProperty('submit');
  expect(emitted().submit[0][0]).toMatchObject(props);
});

// test('display displayName error when the value is invalid', () => {

// });
