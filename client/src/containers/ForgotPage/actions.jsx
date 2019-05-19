import { FORGOT_PASSWORD_REQUEST } from './constants';

export default function forgot(payload) {
  return {
    type: FORGOT_PASSWORD_REQUEST,
    payload,
  };
}
