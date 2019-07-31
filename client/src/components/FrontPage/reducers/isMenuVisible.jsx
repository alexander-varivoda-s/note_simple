import { handleAction } from 'redux-actions';

export default handleAction(
  'TOGGLE_MENU',
  (state, { payload: { isVisible } }) => isVisible,
  false
);
