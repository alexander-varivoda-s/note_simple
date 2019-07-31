import { handleAction } from 'redux-actions';

export default handleAction(
  'TOGGLE_SIDEBAR',
  (state, { payload: { isVisible } }) => isVisible,
  true
);
