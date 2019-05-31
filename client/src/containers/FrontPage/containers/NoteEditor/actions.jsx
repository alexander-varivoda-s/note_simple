import { NOTE_SAVE_REQUEST } from './constants';

// eslint-disable-next-line import/prefer-default-export
export const noteSaveAction = (text, noteId) => ({
  type: NOTE_SAVE_REQUEST,
  payload: {
    noteId,
    text,
  },
});
