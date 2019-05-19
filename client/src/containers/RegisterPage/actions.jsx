import { REGISTRATION_REQUEST } from './constants';

export default function register(payload) {
  return {
    type: REGISTRATION_REQUEST,
    payload,
  };
}
