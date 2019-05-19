import { EMAIL_VERIFICATION_REQUEST } from './constants';

export default function verifyEmail(token) {
  return {
    type: EMAIL_VERIFICATION_REQUEST,
    payload: {
      token,
    },
  };
}
