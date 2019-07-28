import { createAction, handleActions } from 'redux-actions';

export const appInitSucceeded = createAction('APP_INITIALIZATION_SUCCEEDED');
export const appInitFailure = createAction('APP_INITIALIZATION_FAILURE');
export const appInit = createAction('APP_INITIALIZATION');

export default handleActions(
  {
    [appInitSucceeded]: () => true,
    [appInitFailure]: () => false,
  },
  null
);
