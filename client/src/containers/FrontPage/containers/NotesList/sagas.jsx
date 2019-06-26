import { call, put, select } from 'redux-saga/effects';
import { notesAPI } from '../../../../api';
import {
  PIN_FAILURE,
  PIN_SUCCEEDED,
  UNPIN_FAILURE,
  UNPIN_SUCCEEDED,
} from './constants';
import { getSelectedNote } from '../../selectors';
import { selectNoteAction } from './actions';

function* selectNote(note) {
  const selectedNote = yield select(getSelectedNote);

  if (selectedNote && selectedNote._id !== note._id) {
    yield put(selectNoteAction(note));
  }
}

export function* pinNote(action) {
  const { note: noteToPin } = action.payload;

  try {
    const {
      data: { note },
    } = yield call(
      notesAPI.pinNote,
      { id: noteToPin._id },
      { withCredentials: true }
    );
    yield put({ type: PIN_SUCCEEDED, payload: { note } });
    yield selectNote(noteToPin);
  } catch (e) {
    yield put({ type: PIN_FAILURE, error: e });
  }
}

export function* unpinNote(action) {
  const { note: noteToUnpin } = action.payload;

  try {
    const {
      data: { note },
    } = yield call(
      notesAPI.unpinNote,
      { id: noteToUnpin._id },
      { withCredentials: true }
    );
    yield put({ type: UNPIN_SUCCEEDED, payload: { note } });
    yield selectNote(noteToUnpin);
  } catch (e) {
    yield put({ type: UNPIN_FAILURE, error: e });
  }
}
