import { EMAIL_VERIFICATION_REQUEST } from './constants';

// eslint-disable-next-line import/prefer-default-export
export const emailVerificationAction = token => ({
  type: EMAIL_VERIFICATION_REQUEST,
  payload: {
    token,
  },
});
