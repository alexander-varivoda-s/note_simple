import { put, call, takeLatest } from 'redux-saga/effects';

import { authAPI } from '../../api';
import { redirect } from '../Shared/actions';
import { verifyEmailFailure, verifyEmailSucceeded } from './actions';

export function* passwordReminderSaga(action) {
  const { params, onSuccess, onFailure } = action.payload;

  try {
    yield call(authAPI.forgotPassword, params);
    yield put(verifyEmailSucceeded());
    yield call(onSuccess);
    yield put(redirect('/login'));
  } catch (e) {
    yield put(verifyEmailFailure());
    yield call(onFailure);
  }
}

export default function* forgotPageSaga() {
  yield takeLatest('VERIFY_EMAIL', passwordReminderSaga);
}
