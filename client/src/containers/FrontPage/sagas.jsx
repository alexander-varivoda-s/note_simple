import {
  call, put, takeLatest, all,
} from 'redux-saga/effects';

import { FETCH_DATA_REQUEST, FETCH_DATA_SUCCEEDED, FETCH_DATA_FAILURE } from './constants';
import { notesAPI, tagsAPI } from '../../api';

export function* fetchData() {
  try {
    const config = { withCredentials: true };
    const { notesResponse, tagsResponse } = yield all({
      notesResponse: call(notesAPI.fetchNotes, config),
      tagsResponse: call(tagsAPI.fetchTags, config),
    });

    const data = {
      notes: notesResponse.data.notes,
      tags: tagsResponse.data.tags,
    };

    yield put({ type: FETCH_DATA_SUCCEEDED, payload: data });
  } catch (e) {
    yield put({ type: FETCH_DATA_FAILURE, error: e });
  }
}

export default function* fetchDataWatcher() {
  yield takeLatest(FETCH_DATA_REQUEST, fetchData);
}
