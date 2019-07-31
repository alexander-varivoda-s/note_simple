import { handleActions, combineActions } from 'redux-actions';

export default handleActions(
  {
    [combineActions(
      'LOGIN_SUCCEEDED',
      'UPDATE_EMAIL_SUCCEEDED',
      'APP_INITIALIZATION_SUCCEEDED'
    )]: (state, { payload: { user } }) => user,
  },
  null
);
