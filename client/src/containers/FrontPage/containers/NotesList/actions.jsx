import {
  NOTE_SELECTED,
  NOTE_UNSELECTED,
  PIN_REQUEST,
  UNPIN_REQUEST,
} from './constants';

export const pinAction = (isPinned, note) => ({
  type: isPinned ? PIN_REQUEST : UNPIN_REQUEST,
  payload: {
    note,
  },
});

export const selectNoteAction = note => ({
  type: NOTE_SELECTED,
  payload: {
    note,
  },
});

export const unselectNoteAction = () => ({
  type: NOTE_UNSELECTED,
});
