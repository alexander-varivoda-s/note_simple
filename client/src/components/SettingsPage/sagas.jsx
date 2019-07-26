import { takeLatest, takeEvery, put, call, all } from 'redux-saga/effects';
import { userAPI } from '../../api';
import {
  APP_SETTINGS_UPDATE_FAILURE,
  APP_SETTINGS_UPDATE_REQUEST,
  APP_SETTINGS_UPDATE_SUCCEEDED,
  DELETE_ACCOUNT_FAILURE,
  DELETE_ACCOUNT_REQUEST,
  DELETE_ACCOUNT_SUCCEEDED,
  UPDATE_EMAIL_FAILURE,
  UPDATE_EMAIL_REQUEST,
  UPDATE_PASSWORD_FAILURE,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCEEDED,
} from './constants';
import { resetAppSettings, saveAppSettings } from '../../utils/settings';
import { UPDATE_EMAIL_SUCCEEDED } from '../Shared/constants';

export function* updateEmailSaga(action) {
  try {
    const result = yield call(userAPI.updateEmail, action.payload);
    if (typeof action.payload.onSuccess === 'function') {
      yield call(action.payload.onSuccess);
    }
    yield put({ type: UPDATE_EMAIL_SUCCEEDED, payload: result });
  } catch (e) {
    if (typeof action.payload.onFailure === 'function') {
      yield call(action.payload.onFailure);
    }
    yield put({ type: UPDATE_EMAIL_FAILURE, error: e });
  }
}

export function* updatePasswordSaga(action) {
  try {
    yield call(userAPI.updatePassword, action.payload);
    if (typeof action.payload.onSuccess === 'function') {
      yield call(action.payload.onSuccess);
    }
    yield put({ type: UPDATE_PASSWORD_SUCCEEDED });
  } catch (e) {
    if (typeof action.payload.onFailure === 'function') {
      yield call(action.payload.onFailure);
    }
    yield put({ type: UPDATE_PASSWORD_FAILURE, error: e });
  }
}

export function* deleteAccountSaga() {
  try {
    yield call(userAPI.deleteAccount);
    yield call(resetAppSettings);
    yield put({ type: DELETE_ACCOUNT_SUCCEEDED });
  } catch (e) {
    yield put({ type: DELETE_ACCOUNT_FAILURE, error: e });
  }
}

export function* updateSettingsSaga(action) {
  const { settings } = action.payload;

  try {
    yield call(saveAppSettings, settings);
    yield put({ type: APP_SETTINGS_UPDATE_SUCCEEDED, payload: { settings } });
  } catch (e) {
    yield put({ type: APP_SETTINGS_UPDATE_FAILURE, error: e });
  }
}

export default function* watchSettingsPageSaga() {
  yield all([
    yield takeLatest(UPDATE_EMAIL_REQUEST, updateEmailSaga),
    yield takeLatest(UPDATE_PASSWORD_REQUEST, updatePasswordSaga),
    yield takeLatest(DELETE_ACCOUNT_REQUEST, deleteAccountSaga),
    yield takeEvery(APP_SETTINGS_UPDATE_REQUEST, updateSettingsSaga),
  ]);
}
