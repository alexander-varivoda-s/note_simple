import { takeLatest, put, call } from 'redux-saga/effects';
import { LOGOUT_REQUESTED, LOGOUT_FAILURE } from './constants';

import { redirectAction } from '../Shared/actions';
import flashMessage from '../FlashMessages/actions';
import { LOGOUT_SUCCEEDED } from '../Shared/constants';
import { clearTokens } from '../../utils/jwt';

function* logoutSaga() {
  try {
    yield call(clearTokens);
    yield put({ type: LOGOUT_SUCCEEDED });
    yield put(redirectAction('/login'));
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
    yield put({ type: LOGOUT_FAILURE, error: e });
    yield put(flashMessage(messages || message));
  }
}

export default function* watchLogout() {
  yield takeLatest(LOGOUT_REQUESTED, logoutSaga);
}
