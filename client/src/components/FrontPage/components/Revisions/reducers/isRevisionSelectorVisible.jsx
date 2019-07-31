import { handleAction } from 'redux-actions';

export default handleAction(
  'TOGGLE_REVISION_SELECTOR',
  (state, { payload: { isVisible } }) => isVisible,
  false
);
