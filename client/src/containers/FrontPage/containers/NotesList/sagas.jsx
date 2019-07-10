import { call, put, select } from 'redux-saga/effects';
import { notesAPI } from '../../../../api';
import {
  PIN_FAILURE,
  PIN_SUCCEEDED,
  UNPIN_FAILURE,
  UNPIN_SUCCEEDED,
} from './constants';
import { getNotes, getSelectedNote } from '../../selectors';
import { selectNoteAction } from './actions';

function* selectNote(noteId) {
  const selectedNote = yield select(getSelectedNote);

  if (selectedNote && selectedNote._id !== noteId) {
    const notes = yield select(getNotes);
    const noteToSelect = notes.find(note => note._id === noteId);
    yield put(selectNoteAction(noteToSelect._id));
  }
}

export function* pinNote(action) {
  const { noteId } = action.payload;

  try {
    const {
      data: { note },
    } = yield call(notesAPI.pinNote, { id: noteId }, { withCredentials: true });
    yield put({ type: PIN_SUCCEEDED, payload: { note } });
    yield selectNote(noteId);
  } catch (e) {
    yield put({ type: PIN_FAILURE, error: e });
  }
}

export function* unpinNote(action) {
  const { noteId } = action.payload;

  try {
    const {
      data: { note },
    } = yield call(
      notesAPI.unpinNote,
      { id: noteId },
      { withCredentials: true }
    );
    yield put({ type: UNPIN_SUCCEEDED, payload: { note } });
    yield selectNote(noteId);
  } catch (e) {
    yield put({ type: UNPIN_FAILURE, error: e });
  }
}
