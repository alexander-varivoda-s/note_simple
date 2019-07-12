import {
  APP_SETTINGS_UPDATE_REQUEST,
  DELETE_ACCOUNT_REQUEST,
  UPDATE_EMAIL_REQUEST,
  UPDATE_PASSWORD_REQUEST,
} from './constants';

export function updateEmailAction(newEmail, password, onSuccess, onFailure) {
  return {
    type: UPDATE_EMAIL_REQUEST,
    payload: {
      email: newEmail,
      password,
      onSuccess,
      onFailure,
    },
  };
}

export function updatePasswordAction(
  oldPassword,
  newPassword,
  onSuccess,
  onFailure
) {
  return {
    type: UPDATE_PASSWORD_REQUEST,
    payload: {
      oldPassword,
      newPassword,
      onSuccess,
      onFailure,
    },
  };
}

export function deleteAccountAction(password) {
  return {
    type: DELETE_ACCOUNT_REQUEST,
    payload: {
      password,
    },
  };
}

export function updateSettingsAction(settings) {
  return {
    type: APP_SETTINGS_UPDATE_REQUEST,
    payload: {
      settings,
    },
  };
}
