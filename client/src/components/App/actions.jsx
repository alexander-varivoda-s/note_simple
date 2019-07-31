import { createAction } from 'redux-actions';

export const appInitSucceeded = createAction('APP_INITIALIZATION_SUCCEEDED');
export const appInitFailure = createAction('APP_INITIALIZATION_FAILURE');
export const initializeApp = createAction('APP_INITIALIZATION');
