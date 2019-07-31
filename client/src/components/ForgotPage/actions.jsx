import { createAction } from 'redux-actions';

export const verifyEmail = createAction(
  'VERIFY_EMAIL',
  ({ params, onSuccess, onFailure }) => ({
    params,
    onSuccess,
    onFailure,
  })
);
export const verifyEmailSucceeded = createAction('VERIFY_EMAIL_SUCCEEDED');
export const verifyEmailFailure = createAction('VERIFY_EMAIL_FAILURE');
