import { put, call, takeLatest } from 'redux-saga/effects';

import { authAPI } from '../../api';
import redirect from '../shared/actions';
import flashMessage from '../FlashMessages/actions';

import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_REQUEST_SUCCEEDED,
  FORGOT_PASSWORD_REQUEST_FAILURE,
} from './constants';

export function* forgot(action) {
  const { params, onSuccess, onFailure } = action.payload;

  try {
    yield call(authAPI.forgotPassword, params);
    yield put({ type: FORGOT_PASSWORD_REQUEST_SUCCEEDED });
    yield call(onSuccess);
    yield put(redirect('/login'));
    yield put(
      flashMessage({
        type: 'status',
        message: 'An email with instructions on how to reset password has been sent.',
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
    yield put({ type: FORGOT_PASSWORD_REQUEST_FAILURE, error: e });
    yield call(onFailure);
    yield put(flashMessage(messages || message));
  }
}

export default function* watchForgotPasswordRequest() {
  yield takeLatest(FORGOT_PASSWORD_REQUEST, forgot);
}
