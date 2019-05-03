import { takeLatest, call, put } from 'redux-saga/effects';
import { authAPI } from '../../api';

import { LOGIN_SUCCEEDED, LOGIN_FAILURE, LOGIN_REQUESTED } from './constants';

export function* login(action) {
  const { params, onSuccess, onFailure } = action.payload;

  try {
    const result = yield call(authAPI.login, params);
    yield put({ type: LOGIN_SUCCEEDED, payload: result });
    yield call(onSuccess);
  } catch (e) {
    yield put({ type: LOGIN_FAILURE, error: e });
    yield call(onFailure);
  }
}

export default function* watchLogin() {
  yield takeLatest(LOGIN_REQUESTED, login);
}
