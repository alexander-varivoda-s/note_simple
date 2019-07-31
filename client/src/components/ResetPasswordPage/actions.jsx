import { createAction } from 'redux-actions';

export const resetPassword = createAction(
  'RESET_PASSWORD',
  ({ params, onSuccess, onFailure }) => ({
    params,
    onSuccess,
    onFailure,
  })
);

export const resetPasswordSucceeded = createAction('RESET_PASSWORD_SUCCEEDED');
export const resetPasswordFailure = createAction('RESET_PASSWORD_FAILURE');
