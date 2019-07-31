import { createAction } from 'redux-actions';

export const deleteAccount = createAction(
  'DELETE_ACCOUNT',
  ({ params, onSuccess, onFailure }) => ({
    params,
    onSuccess,
    onFailure,
  })
);
export const deleteAccountSucceeded = createAction('DELETE_ACCOUNT_SUCCEEDED');
export const deleteAccountFailure = createAction('DELETE_ACCOUNT_FAILURE');
export const updatePassword = createAction(
  'UPDATE_PASSWORD',
  ({ params, onSuccess, onFailure }) => ({
    params,
    onSuccess,
    onFailure,
  })
);
export const updatePasswordSucceeded = createAction(
  'UPDATE_PASSWORD_SUCCEEDED'
);
export const updatePasswordFailure = createAction('UPDATE_PASSWORD_FAILURE');
export const updateEmail = createAction(
  'UPDATE_EMAIL',
  ({ params, onSuccess, onFailure }) => ({
    params,
    onSuccess,
    onFailure,
  })
);
export const updateEmailSucceeded = createAction(
  'UPDATE_EMAIL_SUCCEEDED',
  user => ({ user })
);
export const updateEmailFailure = createAction('UPDATE_EMAIL_FAILURE');
export const updateSettings = createAction('UPDATE_SETTINGS', settings => ({
  settings,
}));
export const updateSettingsSucceeded = createAction(
  'UPDATE_SETTINGS_SUCCEEDED',
  settings => ({
    settings,
  })
);
export const updateSettingsFailure = createAction('UPDATE_SETTINGS_FAILURE');
