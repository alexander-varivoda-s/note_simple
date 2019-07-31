import { createAction } from 'redux-actions';

// eslint-disable-next-line import/prefer-default-export
export const verifyAccount = createAction('VERIFY_ACCOUNT', token => ({
  token,
}));
export const accountVerificationSucceeded = createAction(
  'ACCOUNT_VERIFICATION_SUCCEEDED'
);
export const accountVerificationFailure = createAction(
  'ACCOUNT_VERIFICATION_FAILURE'
);
