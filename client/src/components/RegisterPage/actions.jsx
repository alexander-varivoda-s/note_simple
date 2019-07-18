import { REGISTRATION_REQUEST } from './constants';

// eslint-disable-next-line import/prefer-default-export
export const registerAction = payload => ({
  type: REGISTRATION_REQUEST,
  payload,
});
