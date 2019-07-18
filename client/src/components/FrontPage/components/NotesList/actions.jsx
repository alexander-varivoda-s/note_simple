import { PIN_REQUEST, UNPIN_REQUEST } from './constants';
import { NOTE_SELECTED } from '../../../Shared/constants';

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
