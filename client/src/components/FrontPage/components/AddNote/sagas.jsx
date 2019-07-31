import { call, put, select } from 'redux-saga/effects';

import { notesAPI } from '../../../../api';
import { getSelectedNote } from '../../selectors';
import { addNoteFailure, addNoteSucceeded } from './actions';
import { noteSelected, noteUnselected } from '../../../Shared/actions';

// eslint-disable-next-line import/prefer-default-export
export function* addNoteSaga(action) {
  const { text } = action.payload;
  const selectedNote = yield select(getSelectedNote);

  try {
    const {
      data: { note },
    } = yield call(notesAPI.addNote, { text });
    yield put(addNoteSucceeded(note));

    if (selectedNote) {
      yield put(noteUnselected);
    }

    yield put(noteSelected(note._id));
  } catch (e) {
    yield put(addNoteFailure(e));
  }
}
