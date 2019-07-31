import { handleActions, combineActions } from 'redux-actions';

export default handleActions(
  {
    [combineActions(
      'APP_INITIALIZATION_SUCCEEDED',
      'LOGOUT_SUCCEEDED',
      'DELETE_ACCOUNT_SUCCEEDED'
    )]: () => true,
    APP_INITIALIZATION_FAILURE: () => false,
  },
  null
);
