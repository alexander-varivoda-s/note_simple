import { REDIRECT, NOTE_UNSELECTED } from './constants';

export const redirectAction = to => ({
  type: REDIRECT,
  payload: {
    to,
  },
});

export const unselectNoteAction = () => ({
  type: NOTE_UNSELECTED,
});
