import { createAction } from 'redux-actions';

export const login = createAction(
  'LOGIN',
  ({ params, onSuccess, onFailure }) => ({ params, onSuccess, onFailure })
);
export const loginSucceeded = createAction(
  'LOGIN_SUCCEEDED',
  ({ user, notes, tags }) => ({
    user,
    notes,
    tags,
  })
);
export const loginFailure = createAction('LOGIN_FAILURE');
