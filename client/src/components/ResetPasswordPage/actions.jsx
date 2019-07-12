import { RESET_PASSWORD_REQUEST } from './constants';

export default function reset(payload) {
  return {
    type: RESET_PASSWORD_REQUEST,
    payload,
  };
}
