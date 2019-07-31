import { put, call } from 'redux-saga/effects';

import { notesAPI } from '../../../../api';
import { saveNoteFailure, saveNoteSucceeded } from './actions';

// eslint-disable-next-line import/prefer-default-export
export function* saveNoteSaga(action) {
  const { text, noteId } = action.payload;

  try {
    const {
      data: { note },
    } = yield call(notesAPI.updateNote, noteId, { text });
    yield put(saveNoteSucceeded(note));
  } catch (e) {
    yield put(saveNoteFailure(e));
  }
}
