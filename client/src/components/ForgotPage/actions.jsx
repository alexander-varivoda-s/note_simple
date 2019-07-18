import { FORGOT_PASSWORD_REQUEST } from './constants';

// eslint-disable-next-line import/prefer-default-export
export const forgotPasswordAction = payload => ({
  type: FORGOT_PASSWORD_REQUEST,
  payload,
});
