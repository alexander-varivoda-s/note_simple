import { takeLatest, call, put } from 'redux-saga/effects';
import { setAccessToken, setRefreshToken } from '../../utils/jwt';
import { authAPI } from '../../api';
import { loginFailure, loginSucceeded } from './actions';
import { fetchData } from '../Shared/sagas';
import { getAppSettings } from '../../utils/settings';

function* loginSaga(action) {
  const { params, onSuccess, onFailure } = action.payload;

  try {
    const {
      data: { refreshToken, accessToken },
    } = yield call(authAPI.login, params, { useAccessToken: false });

    yield call(setAccessToken, accessToken);
    yield call(setRefreshToken, refreshToken);

    yield put(
      loginSucceeded({
        ...(yield* fetchData()),
        settings: getAppSettings(),
      })
    );
    yield call(onSuccess);
  } catch (e) {
    yield put(loginFailure(e));
    yield call(onFailure);
  }
}

export default function* loginPageSaga() {
  yield takeLatest('LOGIN', loginSaga);
}
