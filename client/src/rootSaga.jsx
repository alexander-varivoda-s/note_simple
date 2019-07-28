import { all } from 'redux-saga/effects';

import loginPageSaga from './components/LoginPage/sagas';
import registrationPageSaga from './components/RegisterPage/sagas';
import emailVerificationSaga from './components/VerifyEmail/sagas';
import forgotPageSaga from './components/ForgotPage/sagas';
import resetPassword from './components/ResetPasswordPage/sagas';
import logoutSaga from './components/LogoutPage/sagas';
import frontPageSaga from './components/FrontPage/sagas';
import settingsPageSaga from './components/SettingsPage/sagas';
import appSaga from './components/App/sagas';

export default function* rootSaga() {
  yield all([
    appSaga(),
    loginPageSaga(),
    registrationPageSaga(),
    emailVerificationSaga(),
    forgotPageSaga(),
    resetPassword(),
    logoutSaga(),
    settingsPageSaga(),
    frontPageSaga(),
  ]);
}
