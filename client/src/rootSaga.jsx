import { all } from 'redux-saga/effects';

import loginSaga from './components/LoginPage/sagas';
import registrationSaga from './components/RegisterPage/sagas';
import emailVerificationSaga from './components/VerifyEmail/sagas';
import getUser from './components/App/sagas';
import forgotPassword from './components/ForgotPage/sagas';
import resetPassword from './components/ResetPasswordPage/sagas';
import logoutSaga from './components/LogoutPage/sagas';
import fetchDataSaga from './components/FrontPage/sagas';
import settingsPageSaga from './components/SettingsPage/sagas';

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
    settingsPageSaga(),
  ]);
}
