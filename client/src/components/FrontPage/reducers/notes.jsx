import { handleActions, combineActions } from 'redux-actions';

function tagsReducer(tags = [], tagId) {
  return tags.filter(tag => tag !== tagId);
}

export default handleActions(
  {
    [combineActions('APP_INITIALIZATION_SUCCEEDED', 'LOGIN_SUCCEEDED')]: (
      state,
      { payload: { notes } }
    ) => notes,
    ADD_NOTE_SUCCEEDED: (state, { payload: { note } }) => [note, ...state],
    [combineActions(
      'PIN_SUCCEEDED',
      'UNPIN_SUCCEEDED',
      'SAVE_NOTE_SUCCEEDED',
      'TAG_NOTE_SUCCEEDED',
      'UNTAG_NOTE_SUCCEEDED',
      'MOVE_NOTE_TO_TRASH_SUCCEEDED',
      'RESTORE_NOTE_SUCCEEDED'
    )]: (state, { payload: { note } }) => {
      const newNotes = [...state];
      const index = newNotes.findIndex(n => n._id === note._id);
      newNotes[index] = note;
      return newNotes;
    },
    DELETE_TAG_SUCCEEDED: (state, { payload: { tagId } }) => {
      const newNotes = [...state];
      for (let i = 0; i < newNotes.length; i += 1) {
        const note = newNotes[i];
        newNotes[i] = {
          ...note,
          tags: tagsReducer(note.tags, tagId),
        };
      }

      return newNotes;
    },
    EDIT_NOTE: (state, { payload: { noteId, text } }) => {
      const index = state.findIndex(n => n._id === noteId);
      if (index < 0) {
        return state;
      }

      const newState = [...state];
      newState[index] = { ...newState[index], text };
      return newState;
    },
    DELETE_NOTE_SUCCEEDED: (state, { payload: { deleted } }) =>
      state.filter(n => n._id !== deleted),
    EMPTY_TRASH_SUCCEEDED: state => state.filter(n => !n.is_deleted),
  },
  []
);
