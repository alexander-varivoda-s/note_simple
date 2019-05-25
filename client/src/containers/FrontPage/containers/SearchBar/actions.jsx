import { SEARCH } from './constants';

export default function searchAction(phrase) {
  return {
    type: SEARCH,
    payload: {
      phrase,
    },
  };
}
