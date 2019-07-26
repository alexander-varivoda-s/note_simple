import { takeLatest, call, put } from 'redux-saga/effects';

import {
  EMAIL_VERIFICATION_REQUEST,
  EMAIL_VERIFICATION_SUCCEEDED,
  EMAIL_VERIFICATION_FAILURE,
} from './constants';

import { authAPI } from '../../api';
import { redirectAction } from '../Shared/actions';
import flashMessage from '../FlashMessages/actions';

function* emailVerificationSaga(action) {
  const { token } = action.payload;
  try {
    yield call(authAPI.verifyEmail, token, { useAccessToken: false });
    yield put({ type: EMAIL_VERIFICATION_SUCCEEDED });
    yield put(redirectAction('/login'));
    yield put(
      flashMessage({
        type: 'status',
        message:
          'Account successfully verified. Use login and password to sign in.',
      })
    );
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

    yield put({ type: EMAIL_VERIFICATION_FAILURE, error: e });
    yield put(redirectAction('/login'));
    yield put(flashMessage(messages || message));
  }
}

export default function* watchEmailVerificationRequest() {
  yield takeLatest(EMAIL_VERIFICATION_REQUEST, emailVerificationSaga);
}
