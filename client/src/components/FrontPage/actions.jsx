import { ADD_NOTE_REQUEST } from './constants';

// eslint-disable-next-line import/prefer-default-export
export const addNoteAction = text => ({
  type: ADD_NOTE_REQUEST,
  payload: {
    text,
  },
});
