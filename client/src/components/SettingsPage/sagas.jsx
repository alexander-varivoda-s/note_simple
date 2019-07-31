import { takeLatest, takeEvery, put, call, all } from 'redux-saga/effects';
import { userAPI } from '../../api';
import { resetAppSettings, saveAppSettings } from '../../utils/settings';
import {
  deleteAccountFailure,
  deleteAccountSucceeded,
  updateEmailFailure,
  updateEmailSucceeded,
  updatePasswordFailure,
  updatePasswordSucceeded,
  updateSettingsFailure,
  updateSettingsSucceeded,
} from './actions';
import { redirect } from '../Shared/actions';
import { clearTokens } from '../../utils/jwt';

export function* updateEmailSaga(action) {
  const { params, onSuccess, onFailure } = action.payload;
  try {
    const {
      data: { user },
    } = yield call(userAPI.updateEmail, params);
    if (typeof onSuccess === 'function') {
      yield call(onSuccess);
    }
    yield put(updateEmailSucceeded(user));
  } catch (e) {
    if (typeof onFailure === 'function') {
      yield call(onFailure);
    }
    yield put(updateEmailFailure(e));
  }
}

export function* updatePasswordSaga(action) {
  const { params, onSuccess, onFailure } = action.payload;
  try {
    yield call(userAPI.updatePassword, params);
    if (typeof onSuccess === 'function') {
      yield call(onSuccess);
    }
    yield put(updatePasswordSucceeded());
  } catch (e) {
    if (typeof onFailure === 'function') {
      yield call(onFailure);
    }
    yield put(updatePasswordFailure(e));
  }
}

export function* deleteAccountSaga(action) {
  const { onSuccess, onFailure, params } = action.payload;
  try {
    yield call(userAPI.deleteAccount, { data: params });
    yield call(resetAppSettings);
    if (typeof onSuccess === 'function') {
      yield call(onSuccess);
    }
    yield put(deleteAccountSucceeded());
    yield put(redirect('/login'));
    yield call(clearTokens);
  } catch (e) {
    if (typeof onFailure === 'function') {
      yield call(onFailure);
    }
    yield put(deleteAccountFailure(e));
  }
}

export function* updateSettingsSaga(action) {
  const { settings } = action.payload;

  try {
    yield call(saveAppSettings, settings);
    yield put(updateSettingsSucceeded(settings));
  } catch (e) {
    yield put(updateSettingsFailure(e));
  }
}

export default function* watchSettingsPageSaga() {
  yield all([
    yield takeLatest('UPDATE_EMAIL', updateEmailSaga),
    yield takeLatest('UPDATE_PASSWORD', updatePasswordSaga),
    yield takeLatest('DELETE_ACCOUNT', deleteAccountSaga),
    yield takeEvery('UPDATE_SETTINGS', updateSettingsSaga),
  ]);
}
