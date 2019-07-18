import { put, call, takeLatest } from 'redux-saga/effects';

import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCEEDED,
  RESET_PASSWORD_FAILURE,
} from './constants';
import { authAPI } from '../../api';
import { redirectAction } from '../Shared/actions';
import flashMessage from '../FlashMessages/actions';

export function* resetPasswordSaga(action) {
  const { params, onSuccess, onFailure } = action.payload;

  try {
    yield call(authAPI.resetPassword, params);
    yield put({ type: RESET_PASSWORD_SUCCEEDED });
    yield call(onSuccess);
    yield put(redirectAction('/login'));
    yield put(
      flashMessage({
        type: 'status',
        message: 'Password has been successfully updated.',
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

    yield put({ type: RESET_PASSWORD_FAILURE, error: e });
    yield call(onFailure);
    yield put(flashMessage(messages || message));
  }
}

export default function* watchResetPasswordRequest() {
  yield takeLatest(RESET_PASSWORD_REQUEST, resetPasswordSaga);
}
