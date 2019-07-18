import { call, put } from 'redux-saga/effects';

import { notesAPI } from '../../../../api';
import { ADD_NOTE_FAILURE, ADD_NOTE_SUCCEEDED } from '../../constants';

// eslint-disable-next-line import/prefer-default-export
export function* addNoteSaga(action) {
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
