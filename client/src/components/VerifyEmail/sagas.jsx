import { takeLatest, call, put } from 'redux-saga/effects';

import { authAPI } from '../../api';
import { redirect } from '../Shared/actions';
import {
  accountVerificationFailure,
  accountVerificationSucceeded,
  verifyAccount,
} from './actions';

function* emailVerificationSaga(action) {
  const { token } = action.payload;
  try {
    yield call(authAPI.verifyAccount, token, { useAccessToken: false });
    yield put(accountVerificationSucceeded());
    yield put(redirect('/login'));
  } catch (e) {
    yield put(accountVerificationFailure(e));
    yield put(redirect('/login'));
  }
}

export default function* watchEmailVerificationRequest() {
  yield takeLatest(verifyAccount, emailVerificationSaga);
}
