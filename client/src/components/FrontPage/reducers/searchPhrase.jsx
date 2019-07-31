import { handleAction } from 'redux-actions';

export default handleAction(
  'SEARCH',
  (state, { payload: { phrase } }) => phrase,
  ''
);
