import { createAction } from 'redux-actions';

// eslint-disable-next-line import/prefer-default-export
export const toggleNoteInfo = createAction('TOGGLE_NOTE_INFO', isVisible => ({
  isVisible,
}));
