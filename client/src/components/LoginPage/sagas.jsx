import { takeLatest, call, put } from 'redux-saga/effects';
import { authAPI } from '../../api';

import { LOGIN_FAILURE, LOGIN_REQUESTED } from './constants';
import flashMessage from '../FlashMessages/actions';
import { LOGIN_SUCCEEDED } from '../Shared/constants';

function* loginSaga(action) {
  const { params, onSuccess, onFailure } = action.payload;

  try {
    const result = yield call(authAPI.login, params, { withCredentials: true });
    yield put({ type: LOGIN_SUCCEEDED, payload: result });
    yield call(onSuccess);
  } catch (e) {
    const { response } = e;
    const message = {
      type: 'error',
      message: 'Something went wrong. Please try again later.',
    };

    let messages = null;
    if (response.status < 500) {
      ({ data: messages } = response);
    }

    yield put({ type: LOGIN_FAILURE, error: e });
    yield call(onFailure);
    yield put(flashMessage(messages || message));
  }
}

export default function* watchLogin() {
  yield takeLatest(LOGIN_REQUESTED, loginSaga);
}
