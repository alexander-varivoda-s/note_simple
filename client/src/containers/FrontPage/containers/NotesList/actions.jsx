import {
  NOTE_SELECTED,
  NOTE_UNSELECTED,
  PIN_REQUEST,
  UNPIN_REQUEST,
} from './constants';

export const pinAction = (isPinned, noteId) => ({
  type: isPinned ? PIN_REQUEST : UNPIN_REQUEST,
  payload: {
    noteId,
  },
});

export const selectNoteAction = noteId => ({
  type: NOTE_SELECTED,
  payload: {
    noteId,
  },
});

export const unselectNoteAction = () => ({
  type: NOTE_UNSELECTED,
});
