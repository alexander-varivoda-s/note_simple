import { takeLatest, call, put } from 'redux-saga/effects';
import { authAPI } from '../../api';
import { redirect } from '../Shared/actions';
import { registrationFailure, registrationSucceeded } from './actions';

function* registrationSaga(action) {
  const { params, onSuccess, onFailure } = action.payload;

  try {
    yield call(authAPI.register, params, { useAccessToken: false });
    yield put(registrationSucceeded());
    yield call(onSuccess);
    yield put(redirect('/login'));
  } catch (e) {
    yield put(registrationFailure(e));
    yield call(onFailure);
  }
}

export default function* registrationPageSaga() {
  yield takeLatest('REGISTRATION', registrationSaga);
}
