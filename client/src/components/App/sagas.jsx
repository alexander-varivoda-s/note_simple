import { call, put, takeLatest } from 'redux-saga/effects';
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from '../../utils/jwt';
import { userAPI } from '../../api';
import { fetchData, selectDefaultNoteSaga } from '../Shared/sagas';
import { appInitFailure, appInitSucceeded } from './actions';
import { getAppSettings } from '../../utils/settings';
import { redirect } from '../Shared/actions';

function* refreshTokens() {
  const currentRefreshToken = getRefreshToken();
  const {
    data: { accessToken, refreshToken },
  } = yield call(userAPI.refreshToken, currentRefreshToken, {
    useAccessToken: false,
  });

  setAccessToken(accessToken);
  setRefreshToken(refreshToken);
}

function* initSaga() {
  if (yield call(getAccessToken)) {
    try {
      yield* refreshTokens();
      yield put(
        appInitSucceeded({
          ...(yield* fetchData()),
          settings: getAppSettings(),
        })
      );

      yield selectDefaultNoteSaga();
    } catch (e) {
      if (e.response.status === 401) {
        yield call(clearTokens);
        yield put(redirect('/login'));
      }
      yield put(appInitFailure(e));
    }
  } else {
    yield put(
      appInitSucceeded({
        user: null,
        notes: [],
        tags: [],
      })
    );
  }
}

export default function* appSaga() {
  yield takeLatest('APP_INITIALIZATION', initSaga);
}
