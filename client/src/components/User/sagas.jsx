import { call, put, takeLatest } from 'redux-saga/effects';

import { authAPI } from '../../api';
import { USER_REQUEST_SUCCEEDED } from '../Shared/constants';
import { USER_REQUESTED, USER_REQUEST_FAILURE } from '../App/constants';

export function* currentUserSaga() {
  try {
    const result = yield call(authAPI.getUser, { withCredentials: true });
    yield put({ type: USER_REQUEST_SUCCEEDED, payload: result });
  } catch (e) {
    yield put({ type: USER_REQUEST_FAILURE, error: e });
  }
}

export default function* watchCurrentUserRequest() {
  yield takeLatest(USER_REQUESTED, currentUserSaga);
}
