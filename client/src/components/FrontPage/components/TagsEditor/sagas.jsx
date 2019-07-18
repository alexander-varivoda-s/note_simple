import { put, call, select } from 'redux-saga/effects';

import {
  TAG_CREATE_FAILURE,
  TAG_CREATE_REQUEST,
  TAG_CREATE_SUCCEEDED,
  TAG_REQUEST_FAILURE,
  TAG_REQUEST_SUCCEEDED,
  UNTAG_REQUEST_FAILURE,
  UNTAG_REQUEST_SUCCEEDED,
} from './constants';
import { notesAPI, tagsAPI } from '../../../../api';
import { getSelectedNote } from '../../selectors';

export function* createTagSaga(name) {
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
    } = yield call(notesAPI.tagNote, tagId, selectedNote._id, {
      withCredentials: true,
    });
    yield put({ type: TAG_REQUEST_SUCCEEDED, payload: { note } });
  } catch (e) {
    yield put({ type: TAG_REQUEST_FAILURE, error: e });
  }
}

export function* untagNoteSaga(action) {
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
