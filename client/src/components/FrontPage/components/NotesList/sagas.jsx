import { call, put, select } from 'redux-saga/effects';
import { notesAPI } from '../../../../api';
import { getNotes, getSelectedNote } from '../../selectors';
import { noteSelected } from '../../../Shared/actions';
import {
  pinFailure,
  pinSucceeded,
  unpinFailure,
  unpinSucceeded,
} from './actions';

function* selectNote(noteId) {
  const selectedNote = yield select(getSelectedNote);

  if (selectedNote && selectedNote._id !== noteId) {
    const notes = yield select(getNotes);
    const noteToSelect = notes.find(note => note._id === noteId);
    yield put(noteSelected(noteToSelect._id));
  }
}

export function* pinNote(action) {
  const { noteId } = action.payload;

  try {
    const {
      data: { note },
    } = yield call(notesAPI.pinNote, { id: noteId });
    yield put(pinSucceeded(note));
    yield selectNote(noteId);
  } catch (e) {
    yield put(pinFailure(e));
  }
}

export function* unpinNote(action) {
  const { noteId } = action.payload;

  try {
    const {
      data: { note },
    } = yield call(notesAPI.unpinNote, { id: noteId });
    yield put(unpinSucceeded(note));
    yield selectNote(noteId);
  } catch (e) {
    yield put(unpinFailure(e));
  }
}
