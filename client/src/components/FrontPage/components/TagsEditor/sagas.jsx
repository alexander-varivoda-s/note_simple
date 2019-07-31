import { put, call, select } from 'redux-saga/effects';

import { notesAPI, tagsAPI } from '../../../../api';
import { getSelectedNote } from '../../selectors';
import {
  createTag,
  createTagFailure,
  createTagSucceeded,
  tagNoteFailure,
  tagNoteSucceeded,
  untagNoteFailure,
  untagNoteSucceeded,
} from './actions';

export function* createTagSaga(name) {
  let tag = null;
  yield put(createTag());

  try {
    ({
      data: { tag },
    } = yield call(tagsAPI.createTag, name));
    yield put(createTagSucceeded(tag));
    return tag;
  } catch (e) {
    yield put(createTagFailure(e));
  }

  return tag;
}

export function* tagNoteSaga(action) {
  const selectedNote = yield select(getSelectedNote);
  const { name } = action.payload;
  let { tagId } = action.payload;

  try {
    if (name) {
      const tag = yield* createTagSaga(name);
      tagId = tag._id;
    }

    const {
      data: { note },
    } = yield call(notesAPI.tagNote, tagId, selectedNote._id);
    yield put(tagNoteSucceeded(note));
  } catch (e) {
    yield put(tagNoteFailure(e));
  }
}

export function* untagNoteSaga(action) {
  const selectedNote = yield select(getSelectedNote);
  const { tagId } = action.payload;

  try {
    const {
      data: { note },
    } = yield call(notesAPI.untagNote, tagId, selectedNote._id);
    yield put(untagNoteSucceeded(note));
  } catch (e) {
    yield put(untagNoteFailure(e));
  }
}
