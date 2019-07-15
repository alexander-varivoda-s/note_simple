import {
  call,
  put,
  takeLatest,
  all,
  takeEvery,
  select,
} from 'redux-saga/effects';

import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCEEDED,
  FETCH_DATA_FAILURE,
  ADD_NOTE_REQUEST,
  ADD_NOTE_SUCCEEDED,
  ADD_NOTE_FAILURE,
} from './constants';
import { notesAPI, tagsAPI } from '../../api';
import { PIN_REQUEST, UNPIN_REQUEST } from './components/NotesList/constants';
import { pinNote, unpinNote } from './components/NotesList/sagas';
import {
  NOTE_SAVE_FAILURE,
  NOTE_SAVE_REQUEST,
  NOTE_SAVE_SUCCEEDED,
} from './components/NoteEditor/constants';
import {
  TAG_CREATE_FAILURE,
  TAG_CREATE_REQUEST,
  TAG_CREATE_SUCCEEDED,
  TAG_DELETE_FAILURE,
  TAG_DELETE_REQUEST,
  TAG_DELETE_SUCCEEDED,
  TAG_REQUEST,
  TAG_REQUEST_FAILURE,
  TAG_REQUEST_SUCCEEDED,
  UNTAG_REQUEST,
  UNTAG_REQUEST_FAILURE,
  UNTAG_REQUEST_SUCCEEDED,
} from './components/TagsEditor/constants';
import { getSelectedNote, getSortedNotes } from './selectors';
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
import {
  selectNoteAction,
  unselectNoteAction,
} from './components/NotesList/actions';

function* selectDefaultNote() {
  const notes = yield select(getSortedNotes);
  if (notes.length) {
    yield put(selectNoteAction(notes[0]._id));
  }
}

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
    yield selectDefaultNote();
  } catch (e) {
    yield put({ type: FETCH_DATA_FAILURE, error: e });
  }
}

export function* addNote(action) {
  const { text } = action.payload;

  try {
    const {
      data: { note },
    } = yield call(notesAPI.addNote, { text }, { withCredentials: true });
    yield put({ type: ADD_NOTE_SUCCEEDED, payload: { note } });
  } catch (e) {
    yield put({ type: ADD_NOTE_FAILURE, error: e });
  }
}

export function* saveNote(action) {
  const { text, noteId } = action.payload;

  try {
    const {
      data: { note },
    } = yield call(
      notesAPI.updateNote,
      noteId,
      { text },
      { withCredentials: true }
    );
    yield put({ type: NOTE_SAVE_SUCCEEDED, payload: { note } });
  } catch (e) {
    yield put({ type: NOTE_SAVE_FAILURE, error: e });
  }
}

export function* createTag(name) {
  let tag = null;
  yield put({ type: TAG_CREATE_REQUEST });

  try {
    ({
      data: { tag },
    } = yield call(tagsAPI.createTag, name, { withCredentials: true }));
    yield put({ type: TAG_CREATE_SUCCEEDED, payload: { tag } });
    return tag;
  } catch (e) {
    yield put({ type: TAG_CREATE_FAILURE, error: e });
  }

  return tag;
}

export function* tagNote(action) {
  const selectedNote = yield select(getSelectedNote);
  const { name } = action.payload;
  let { tagId } = action.payload;

  try {
    if (name) {
      const tag = yield* createTag(name);
      tagId = tag._id;
    }

    const {
      data: { note },
    } = yield call(notesAPI.tagNote, tagId, selectedNote._id, {
      withCredentials: true,
    });
    yield put({ type: TAG_REQUEST_SUCCEEDED, payload: { note } });
  } catch (e) {
    yield put({ type: TAG_REQUEST_FAILURE, error: e });
  }
}

export function* untagNote(action) {
  const selectedNote = yield select(getSelectedNote);
  const { tagId } = action.payload;

  try {
    const {
      data: { note },
    } = yield call(notesAPI.untagNote, tagId, selectedNote._id, {
      withCredentials: true,
    });
    yield put({ type: UNTAG_REQUEST_SUCCEEDED, payload: { note } });
  } catch (e) {
    yield put({ type: UNTAG_REQUEST_FAILURE, error: e });
  }
}

export function* deleteTag(action) {
  const { tagId } = action.payload;

  try {
    yield call(tagsAPI.deleteTag, tagId, { withCredentials: true });
    yield put({ type: TAG_DELETE_SUCCEEDED, payload: { tagId } });
  } catch (e) {
    yield put({ type: TAG_DELETE_FAILURE, error: e });
  }
}

export function* noteSelection() {
  const selectedNote = yield select(getSelectedNote);

  if (selectedNote) {
    yield put(unselectNoteAction());
  }

  yield selectDefaultNote();
}

export default function* fetchDataWatcher() {
  yield takeLatest(FETCH_DATA_REQUEST, fetchData);
  yield takeEvery(ADD_NOTE_REQUEST, addNote);
  yield takeEvery(PIN_REQUEST, pinNote);
  yield takeEvery(UNPIN_REQUEST, unpinNote);
  yield takeEvery(NOTE_SAVE_REQUEST, saveNote);
  yield takeEvery(TAG_REQUEST, tagNote);
  yield takeEvery(UNTAG_REQUEST, untagNote);
  yield takeEvery(TAG_DELETE_REQUEST, deleteTag);
  yield takeEvery(MOVE_TO_TRASH_REQUEST, moveToTrash);
  yield takeLatest(RESTORE_NOTE_REQUEST, restoreNote);
  yield takeLatest(DELETE_NOTE_REQUEST, deleteNote);
  yield takeEvery(FILTER_NOTES, noteSelection);
}
