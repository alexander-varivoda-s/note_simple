import { takeLatest, put, call } from 'redux-saga/effects';
import {
  LOGOUT_REQUESTED,
  LOGOUT_SUCCEEDED,
  LOGOUT_FAILURE,
} from './constants';

import { authAPI } from '../../api';
import redirect from '../shared/actions';
import flashMessage from '../FlashMessages/actions';

export function* logout() {
  try {
    yield call(authAPI.logout, { withCredentials: true });
    yield put({ type: LOGOUT_SUCCEEDED });
    yield put(redirect('/login'));
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
  yield takeLatest(LOGOUT_REQUESTED, logout);
}
