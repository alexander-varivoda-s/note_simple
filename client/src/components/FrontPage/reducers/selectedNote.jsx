import { handleActions } from 'redux-actions';

export default handleActions(
  {
    NOTE_SELECTED: (state, { payload: { noteId } }) => noteId,
    NOTE_UNSELECTED: () => null,
  },
  null
);
