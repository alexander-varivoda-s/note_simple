import { LOGIN_REQUESTED } from './constants';

export default function login(payload) {
  return {
    type: LOGIN_REQUESTED,
    payload,
  };
}
