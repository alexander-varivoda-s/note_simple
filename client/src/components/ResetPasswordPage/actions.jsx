import { RESET_PASSWORD_REQUEST } from './constants';

// eslint-disable-next-line import/prefer-default-export
export const resetPasswordAction = payload => ({
  type: RESET_PASSWORD_REQUEST,
  payload,
});
