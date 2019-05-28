import {
  call, put, takeLatest, all, takeEvery,
} from 'redux-saga/effects';

import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCEEDED,
  FETCH_DATA_FAILURE,
  ADD_NOTE_REQUEST, ADD_NOTE_SUCCEEDED, ADD_NOTE_FAILURE,
} from './constants';
import { notesAPI, tagsAPI } from '../../api';
import {
  PIN_REQUEST,
  UNPIN_REQUEST,
} from './containers/NotesList/constants';

import { pinNote, unpinNote } from './containers/NotesList/sagas';

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

export function* addNote(action) {
  const { text } = action.payload;

  try {
    const { data: { note } } = yield call(notesAPI.addNote, { text }, { withCredentials: true });
    yield put({ type: ADD_NOTE_SUCCEEDED, payload: { note } });
  } catch (e) {
    yield put({ type: ADD_NOTE_FAILURE, error: e });
  }
}

export default function* fetchDataWatcher() {
  yield takeLatest(FETCH_DATA_REQUEST, fetchData);
  yield takeEvery(ADD_NOTE_REQUEST, addNote);
  yield takeEvery(PIN_REQUEST, pinNote);
  yield takeEvery(UNPIN_REQUEST, unpinNote);
}
