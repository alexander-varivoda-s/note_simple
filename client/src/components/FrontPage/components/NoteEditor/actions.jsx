import { createAction } from 'redux-actions';

export const saveNote = createAction('SAVE_NOTE', (text, noteId) => ({
  text,
  noteId,
}));
export const saveNoteSucceeded = createAction('SAVE_NOTE_SUCCEEDED', note => ({
  note,
}));
export const saveNoteFailure = createAction('SAVE_NOTE_FAILURE');
export const editNote = createAction('EDIT_NOTE', (text, noteId) => ({
  text,
  noteId,
}));
export const editNoteSucceeded = createAction('EDIT_NOTE_SUCCEEDED');
export const editNoteFailure = createAction('EDIT_NOTE_FAILURE');
