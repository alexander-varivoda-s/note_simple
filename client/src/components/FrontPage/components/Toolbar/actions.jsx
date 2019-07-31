import { createAction } from 'redux-actions';

export const toggleSidebar = createAction('TOGGLE_SIDEBAR', isVisible => ({
  isVisible,
}));
export const moveNoteToTrash = createAction('MOVE_NOTE_TO_TRASH');
export const moveNoteToTrashSucceeded = createAction(
  'MOVE_NOTE_TO_TRASH_SUCCEEDED',
  note => ({ note })
);
export const moveNoteToTrashFailure = createAction(
  'MOVE_NOTE_TO_TRASH_FAILURE'
);
export const deleteNote = createAction('DELETE_NOTE');
export const deleteNoteSucceeded = createAction(
  'DELETE_NOTE_SUCCEEDED',
  deleted => ({ deleted })
);
export const deleteNoteFailure = createAction('DELETE_NOTE_FAILURE');
