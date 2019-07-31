import { handleAction } from 'redux-actions';

export default handleAction(
  'FILTER_NOTES',
  (state, { payload: { filter } }) => filter,
  'ALL_NOTES'
);
