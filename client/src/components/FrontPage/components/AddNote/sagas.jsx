import { call, put, select } from 'redux-saga/effects';

import { notesAPI } from '../../../../api';
import { ADD_NOTE_FAILURE, ADD_NOTE_SUCCEEDED } from '../../constants';
import { getSelectedNote } from '../../selectors';
import { unselectNoteAction } from '../../../Shared/actions';
import { NOTE_SELECTED } from '../../../Shared/constants';

// eslint-disable-next-line import/prefer-default-export
export function* addNoteSaga(action) {
  const { text } = action.payload;
  const selectedNote = yield select(getSelectedNote);

  try {
    const {
      data: { note },
    } = yield call(notesAPI.addNote, { text }, { withCredentials: true });
    yield put({ type: ADD_NOTE_SUCCEEDED, payload: { note } });

    if (selectedNote) {
      yield put(unselectNoteAction());
    }

    yield put({ type: NOTE_SELECTED, payload: { noteId: note._id } });
  } catch (e) {
    yield put({ type: ADD_NOTE_FAILURE, error: e });
  }
}
