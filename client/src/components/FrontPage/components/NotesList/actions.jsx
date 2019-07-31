import { createAction } from 'redux-actions';

export const pin = createAction('PIN', noteId => ({ noteId }));
export const pinSucceeded = createAction('PIN_SUCCEEDED', note => ({ note }));
export const pinFailure = createAction('PIN_FAILURE');
export const unpin = createAction('UNPIN', noteId => ({ noteId }));
export const unpinSucceeded = createAction('UNPIN_SUCCEEDED', note => ({
  note,
}));
export const unpinFailure = createAction('UNPIN_FAILURE');
