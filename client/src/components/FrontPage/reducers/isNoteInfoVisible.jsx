import { handleAction } from 'redux-actions';

export default handleAction(
  'TOGGLE_NOTE_INFO',
  (state, { payload: { isVisible } }) => isVisible,
  false
);
