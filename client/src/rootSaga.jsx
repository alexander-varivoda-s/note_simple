import { all } from 'redux-saga/effects';

import loginSaga from './containers/LoginPage/sagas';
import registrationSaga from './containers/RegisterPage/sagas';
import emailVerificationSaga from './containers/VerifyEmail/sagas';
import getUser from './containers/App/sagas';
import forgotPassword from './containers/ForgotPage/sagas';
import resetPassword from './containers/ResetPasswordPage/sagas';
import logoutSaga from './containers/LogoutPage/sagas';
import fetchDataSaga from './containers/FrontPage/sagas';

export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    emailVerificationSaga(),
    getUser(),
    forgotPassword(),
    resetPassword(),
    logoutSaga(),
    fetchDataSaga(),
  ]);
}
