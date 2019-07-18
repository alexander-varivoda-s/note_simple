import { SEARCH } from './constants';

// eslint-disable-next-line import/prefer-default-export
export const searchAction = phrase => ({
  type: SEARCH,
  payload: {
    phrase,
  },
});
