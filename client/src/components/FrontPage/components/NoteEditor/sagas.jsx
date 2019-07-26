import { put, call } from 'redux-saga/effects';

import { notesAPI } from '../../../../api';
import { NOTE_SAVE_FAILURE, NOTE_SAVE_SUCCEEDED } from './constants';

// eslint-disable-next-line import/prefer-default-export
export function* saveNoteSaga(action) {
  const { text, noteId } = action.payload;

  try {
    const {
      data: { note },
    } = yield call(notesAPI.updateNote, noteId, { text });
    yield put({ type: NOTE_SAVE_SUCCEEDED, payload: { note } });
  } catch (e) {
    yield put({ type: NOTE_SAVE_FAILURE, error: e });
  }
}
