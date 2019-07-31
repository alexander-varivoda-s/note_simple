import { createAction } from 'redux-actions';

export const logout = createAction('LOGOUT');
export const logoutSucceeded = createAction('LOGOUT_SUCCEEDED');
export const logoutFailure = createAction('LOGOUT_FAILURE');
