import {
  NOTE_SELECTED,
  NOTE_UNSELECTED,
  PIN_REQUEST,
  UNPIN_REQUEST,
} from './constants';

export const pinAction = (isPinned, id) => ({
  type: isPinned ? PIN_REQUEST : UNPIN_REQUEST,
  payload: {
    id,
  },
});

export const selectNoteAction = note => ({
  type: NOTE_SELECTED,
  payload: {
    note,
  },
});

export const unselectNoteAction = note => ({
  type: NOTE_UNSELECTED,
  payload: {
    note,
  },
});
