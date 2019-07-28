import { call, put, takeLatest, all } from 'redux-saga/effects';
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from '../../utils/jwt';
import { authAPI, notesAPI, tagsAPI, userAPI } from '../../api';
import { selectDefaultNoteSaga } from '../Shared/sagas';
import { appInitFailure, appInitSucceeded } from './reducers/appInitialized';

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
      yield refreshTokens();

      const { userResponse, notesResponse, tagsResponse } = yield all({
        userResponse: call(authAPI.getUser),
        notesResponse: call(notesAPI.fetchNotes),
        tagsResponse: call(tagsAPI.fetchTags),
      });

      yield put(
        appInitSucceeded({
          user: userResponse.data.user,
          notes: notesResponse.data.notes,
          tags: tagsResponse.data.tags,
        })
      );

      yield selectDefaultNoteSaga();
    } catch (e) {
      yield put(appInitFailure());
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
