import { call, put, takeLatest } from 'redux-saga/effects';

import { authAPI } from '../../api';
import { USER_REQUEST_SUCCEEDED } from '../Shared/constants';
import { USER_REQUESTED, USER_REQUEST_FAILURE } from './constants';

export function* currentUserSaga() {
  try {
    const {
      data: { user },
    } = yield call(authAPI.getUser);
    yield put({ type: USER_REQUEST_SUCCEEDED, payload: { user } });
  } catch (e) {
    yield put({ type: USER_REQUEST_FAILURE, error: e });
  }
}

export default function* watchCurrentUserRequest() {
  yield takeLatest(USER_REQUESTED, currentUserSaga);
}
