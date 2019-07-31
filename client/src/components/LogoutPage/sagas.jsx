import { takeLatest, put, call } from 'redux-saga/effects';
import { redirect } from '../Shared/actions';
import { clearTokens } from '../../utils/jwt';
import { logoutFailure, logoutSucceeded } from './actions';

function* logoutSaga() {
  try {
    yield call(clearTokens);
    yield put(logoutSucceeded());
    yield put(redirect('/login'));
  } catch (e) {
    yield put(logoutFailure(e));
  }
}

export default function* watchLogout() {
  yield takeLatest('LOGOUT', logoutSaga);
}
