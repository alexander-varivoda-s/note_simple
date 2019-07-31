import { createAction } from 'redux-actions';

export const addNote = createAction('ADD_NOTE', text => ({ text }));
export const addNoteSucceeded = createAction('ADD_NOTE_SUCCEEDED', note => ({
  note,
}));
export const addNoteFailure = createAction('ADD_NOTE_FAILURE');
