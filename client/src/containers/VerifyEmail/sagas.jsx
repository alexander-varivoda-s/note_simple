import { takeLatest, call, put } from 'redux-saga/effects';

import {
  EMAIL_VERIFICATION_REQUEST,
  EMAIL_VERIFICATION_SUCCEEDED,
  EMAIL_VERIFICATION_FAILURE,
} from './constants';

import { authAPI } from '../../api';
import redirect from '../shared/actions';
import flashMessage from '../FlashMessages/actions';

export function* verifyEmail(action) {
  try {
    yield call(authAPI.verifyEmail, action.payload.token);
    yield put({ type: EMAIL_VERIFICATION_SUCCEEDED });
    yield put(redirect('/login'));
    yield put(
      flashMessage({
        type: 'status',
        message: 'Account successfully verified. Use login and password to sign in.',
      }),
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
    yield put(redirect('/login'));
    yield put(flashMessage(messages || message));
  }
}

export default function* watchEmailVerificationRequest() {
  yield takeLatest(EMAIL_VERIFICATION_REQUEST, verifyEmail);
}
