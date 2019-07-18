import { call, put, takeLatest, all, takeEvery } from 'redux-saga/effects';

import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCEEDED,
  FETCH_DATA_FAILURE,
  ADD_NOTE_REQUEST,
} from './constants';
import { notesAPI, tagsAPI } from '../../api';
import { PIN_REQUEST, UNPIN_REQUEST } from './components/NotesList/constants';
import { pinNote, unpinNote } from './components/NotesList/sagas';
import { NOTE_SAVE_REQUEST } from './components/NoteEditor/constants';
import {
  TAG_DELETE_REQUEST,
  TAG_REQUEST,
  UNTAG_REQUEST,
} from './components/TagsEditor/constants';
import {
  DELETE_NOTE_REQUEST,
  MOVE_TO_TRASH_REQUEST,
  RESTORE_NOTE_REQUEST,
} from './components/Toolbar/constants';
import {
  deleteNote,
  restoreNote,
  moveToTrash,
} from './components/Toolbar/sagas';
import { FILTER_NOTES } from './components/Menu/constants';
import { addNoteSaga } from './components/AddNote/sagas';
import { saveNoteSaga } from './components/NoteEditor/sagas';
import { tagNoteSaga, untagNoteSaga } from './components/TagsEditor/sagas';
import { deleteTagSaga, noteSelectionSaga } from './components/Menu/sagas';
import { selectDefaultNoteSaga } from '../Shared/sagas';
import { SEARCH } from './components/Search/constants';
import { searchSaga } from './components/Search/sagas';
import { emptyTrashSaga } from './components/EmptyTrash/sagas';
import { EMPTY_TRASH_REQUEST } from '../Shared/constants';

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
    yield selectDefaultNoteSaga();
  } catch (e) {
    yield put({ type: FETCH_DATA_FAILURE, error: e });
  }
}

export default function* fetchDataWatcher() {
  yield takeLatest(FETCH_DATA_REQUEST, fetchData);
  yield takeEvery(ADD_NOTE_REQUEST, addNoteSaga);
  yield takeEvery(PIN_REQUEST, pinNote);
  yield takeEvery(UNPIN_REQUEST, unpinNote);
  yield takeEvery(NOTE_SAVE_REQUEST, saveNoteSaga);
  yield takeEvery(TAG_REQUEST, tagNoteSaga);
  yield takeEvery(UNTAG_REQUEST, untagNoteSaga);
  yield takeEvery(TAG_DELETE_REQUEST, deleteTagSaga);
  yield takeEvery(MOVE_TO_TRASH_REQUEST, moveToTrash);
  yield takeLatest(RESTORE_NOTE_REQUEST, restoreNote);
  yield takeLatest(DELETE_NOTE_REQUEST, deleteNote);
  yield takeEvery(FILTER_NOTES, noteSelectionSaga);
  yield takeEvery(SEARCH, searchSaga);
  yield takeEvery(EMPTY_TRASH_REQUEST, emptyTrashSaga);
}
