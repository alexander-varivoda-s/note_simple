import { REDIRECT } from './constants';

// eslint-disable-next-line import/prefer-default-export
export const redirectAction = to => ({
  type: REDIRECT,
  payload: {
    to,
  },
});
