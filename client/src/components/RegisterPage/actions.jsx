import { createAction } from 'redux-actions';

export const register = createAction(
  'REGISTRATION',
  ({ params, onSuccess, onFailure }) => ({
    params,
    onSuccess,
    onFailure,
  })
);

export const registrationSucceeded = createAction('REGISTRATION_SUCCEEDED');
export const registrationFailure = createAction('REGISTRATION_FAILURE');
