import { LOGIN_REQUESTED } from './constants';

// eslint-disable-next-line import/prefer-default-export
export const loginAction = payload => ({
  type: LOGIN_REQUESTED,
  payload,
});
