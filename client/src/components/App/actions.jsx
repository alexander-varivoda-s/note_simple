import { USER_REQUESTED } from './constants';

export default function getCurrentUser() {
  return {
    type: USER_REQUESTED,
  };
}
