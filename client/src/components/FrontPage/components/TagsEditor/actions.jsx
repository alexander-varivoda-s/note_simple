import { createAction } from 'redux-actions';

export const createTag = createAction('CREATE_TAG');
export const createTagSucceeded = createAction(
  'TAG_CREATION_SUCCEEDED',
  tag => ({ tag })
);
export const createTagFailure = createAction('TAG_CREATION_FAILURE');
export const tagNote = createAction('TAG_NOTE', (tagId, name) => ({
  tagId,
  name,
}));
export const tagNoteSucceeded = createAction('TAG_NOTE_SUCCEEDED', note => ({
  note,
}));
export const tagNoteFailure = createAction('TAG_NOTE_FAILURE');
export const untagNote = createAction('UNTAG_NOTE', tagId => ({
  tagId,
}));
export const untagNoteSucceeded = createAction(
  'UNTAG_NOTE_SUCCEEDED',
  note => ({
    note,
  })
);
export const untagNoteFailure = createAction('UNTAG_NOTE_FAILURE');
export const deleteTag = createAction('DELETE_TAG', tagId => ({ tagId }));
export const deleteTagSucceeded = createAction(
  'DELETE_TAG_SUCCEEDED',
  tagId => ({ tagId })
);
export const deleteTagFailure = createAction('DELETE_TAG_FAILURE');
