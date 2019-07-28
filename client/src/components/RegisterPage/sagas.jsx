import { takeLatest, call, put } from 'redux-saga/effects';
import { authAPI } from '../../api';
import { redirectAction } from '../Shared/actions';
import flashMessage from '../FlashMessages/actions';
import {
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCEEDED,
  REGISTRATION_FAILED,
} from './constants';

function* registrationSaga(action) {
  const { params, onSuccess, onFailure } = action.payload;

  try {
    yield call(authAPI.register, params, { useAccessToken: false });
    yield put({ type: REGISTRATION_SUCCEEDED });
    yield call(onSuccess);
    yield put(redirectAction('/login'));
    yield put(
      flashMessage({
        type: 'status',
        message:
          'Account has been successfully created. An email with instructions on how to activate it has been sent.',
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

    yield put({ type: REGISTRATION_FAILED, error: e });
    yield call(onFailure);
    yield put(flashMessage(messages || message));
  }
}

export default function* registrationPageSaga() {
  yield takeLatest(REGISTRATION_REQUEST, registrationSaga);
}
