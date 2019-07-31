import { handleActions } from 'redux-actions';
import { clearFlashMessages, flashMessage } from '../actions';

export default handleActions(
  {
    [flashMessage]: (state, { payload: { messages } }) => [...messages],
    [clearFlashMessages]: () => [],
  },
  []
);
