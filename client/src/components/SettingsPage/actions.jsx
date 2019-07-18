import {
  APP_SETTINGS_UPDATE_REQUEST,
  DELETE_ACCOUNT_REQUEST,
  UPDATE_EMAIL_REQUEST,
  UPDATE_PASSWORD_REQUEST,
} from './constants';

export const updateEmailAction = (
  newEmail,
  password,
  onSuccess,
  onFailure
) => ({
  type: UPDATE_EMAIL_REQUEST,
  payload: {
    email: newEmail,
    password,
    onSuccess,
    onFailure,
  },
});

export const updatePasswordAction = (
  oldPassword,
  newPassword,
  onSuccess,
  onFailure
) => ({
  type: UPDATE_PASSWORD_REQUEST,
  payload: {
    oldPassword,
    newPassword,
    onSuccess,
    onFailure,
  },
});

export const deleteAccountAction = password => ({
  type: DELETE_ACCOUNT_REQUEST,
  payload: {
    password,
  },
});

export const updateSettingsAction = settings => ({
  type: APP_SETTINGS_UPDATE_REQUEST,
  payload: {
    settings,
  },
});
