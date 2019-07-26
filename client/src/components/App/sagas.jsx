import { call, put, takeLatest, all } from 'redux-saga/effects';
import {
  INIT,
  INITIALIZATION_FAILED,
  INITIALIZATION_SUCCEEDED,
} from './constants';
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from '../../utils/jwt';
import { authAPI, notesAPI, tagsAPI, userAPI } from '../../api';
import { selectDefaultNoteSaga } from '../Shared/sagas';

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

      yield put({
        type: INITIALIZATION_SUCCEEDED,
        payload: {
          user: userResponse.data.user,
          notes: notesResponse.data.notes,
          tags: tagsResponse.data.tags,
        },
      });

      yield selectDefaultNoteSaga();
    } catch (e) {
      yield put({ type: INITIALIZATION_FAILED });
    }
  } else {
    yield put({
      type: INITIALIZATION_SUCCEEDED,
      payload: {
        user: null,
        notes: [],
        tags: [],
      },
    });
  }
}

export default function* initWatcher() {
  yield takeLatest(INIT, initSaga);
}
