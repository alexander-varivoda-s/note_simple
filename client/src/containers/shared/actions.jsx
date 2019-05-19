import { REDIRECT } from './constants';

export default function redirect(to) {
  return {
    type: REDIRECT,
    payload: {
      to,
    },
  };
}
