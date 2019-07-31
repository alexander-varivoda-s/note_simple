import { createAction } from 'redux-actions';

export const noteSelected = createAction('NOTE_SELECTED', noteId => ({
  noteId,
}));
export const noteUnselected = createAction('NOTE_UNSELECTED');
export const redirect = createAction('REDIRECT', to => ({ to }));
export const fetchData = createAction('FETCH_DATA');
export const fetchDataSucceeded = createAction(
  'FETCH_DATA_SUCCEEDED',
  (notes, tags) => ({
    notes,
    tags,
  })
);
export const fetchDataFailure = createAction('FETCH_DATA_FAILURE');
