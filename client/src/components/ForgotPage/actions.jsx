import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_REQUEST_FAILURE,
  FORGOT_PASSWORD_REQUEST_SUCCEEDED,
} from './constants';

export const forgotPasswordAction = payload => ({
  type: FORGOT_PASSWORD_REQUEST,
  payload,
});

export const forgotPasswordRequestSucceededAction = () => ({
  type: FORGOT_PASSWORD_REQUEST_SUCCEEDED,
});

export const forgotPasswordRequestFailureAction = error => ({
  type: FORGOT_PASSWORD_REQUEST_FAILURE,
  error,
});
