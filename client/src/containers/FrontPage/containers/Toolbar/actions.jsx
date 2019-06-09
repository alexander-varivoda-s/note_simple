import { MOVE_TO_TRASH_REQUEST, TOGGLE_NOTE_INFO } from './constants';

export const toggleNoteVisibilityAction = isVisible => ({
  type: TOGGLE_NOTE_INFO,
  payload: {
    isVisible,
  },
});

export const moveToTrashAction = noteId => ({
  type: MOVE_TO_TRASH_REQUEST,
  payload: {
    noteId,
  },
});
