import { put, call, takeLatest } from 'redux-saga/effects';
import { authAPI } from '../../api';
import { redirect } from '../Shared/actions';
import { resetPasswordFailure, resetPasswordSucceeded } from './actions';

export function* resetPasswordSaga(action) {
  const { params, onSuccess, onFailure } = action.payload;

  try {
    yield call(authAPI.resetPassword, params);
    yield put(resetPasswordSucceeded());
    yield call(onSuccess);
    yield put(redirect('/login'));
  } catch (e) {
    yield put(resetPasswordFailure(e));
    yield call(onFailure);
  }
}

export default function* watchResetPasswordRequest() {
  yield takeLatest('RESET_PASSWORD', resetPasswordSaga);
}
