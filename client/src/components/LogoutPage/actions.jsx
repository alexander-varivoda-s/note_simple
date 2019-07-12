import { LOGOUT_REQUESTED } from './constants';

export default function logout() {
  return {
    type: LOGOUT_REQUESTED,
  };
}
