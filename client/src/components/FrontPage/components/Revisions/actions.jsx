import { createAction } from 'redux-actions';

export const toggleRevisionSelector = createAction(
  'TOGGLE_REVISION_SELECTOR',
  isVisible => ({ isVisible })
);

export const restoreNote = createAction('RESTORE_NOTE');
export const restoreNoteSucceeded = createAction(
  'RESTORE_NOTE_SUCCEEDED',
  note => ({ note })
);
export const restoreNoteFailure = createAction('RESTORE_NOTE_FAILURE');
