import { put, call, select } from 'redux-saga/effects';
import { notesAPI } from '../../../../api';

import { getSelectedNote, getSortedNotes } from '../../selectors';
import { restoreNoteFailure, restoreNoteSucceeded } from '../Revisions/actions';
import { noteSelected, noteUnselected } from '../../../Shared/actions';
import {
  deleteNoteFailure,
  deleteNoteSucceeded,
  moveNoteToTrashFailure,
  moveNoteToTrashSucceeded,
} from './actions';

function findNoteToSelect(notes, currentNote) {
  let noteToSelect = null;

  if (notes.length > 1) {
    const index = notes.findIndex(n => n._id === currentNote._id);
    if (index === 0) {
      noteToSelect = notes[index + 1];
    }

    if (index > 0) {
      noteToSelect = notes[index - 1];
    }
  }

  return noteToSelect;
}

export function* restoreNote() {
  const selectedNote = yield select(getSelectedNote);
  const notes = yield select(getSortedNotes);

  try {
    const {
      data: { note },
    } = yield call(notesAPI.updateNote, selectedNote._id, {
      is_deleted: false,
    });
    yield put(restoreNoteSucceeded(note));
    yield put(noteUnselected());

    const noteToSelect = findNoteToSelect(notes, selectedNote);

    if (noteToSelect) {
      yield put(noteSelected(noteToSelect._id));
    }
  } catch (e) {
    yield put(restoreNoteFailure(e));
  }
}

export function* deleteNote() {
  const selectedNote = yield select(getSelectedNote);
  const notes = yield select(getSortedNotes);

  try {
    const {
      data: { deleted },
    } = yield call(notesAPI.deleteNote, selectedNote._id);
    yield put(deleteNoteSucceeded(deleted));
    yield put(noteUnselected());

    const noteToSelect = findNoteToSelect(notes, selectedNote);

    if (noteToSelect) {
      yield put(noteSelected(noteToSelect._id));
    }
  } catch (e) {
    yield put(deleteNoteFailure(e));
  }
}

export function* moveToTrash() {
  const selectedNote = yield select(getSelectedNote);
  const notes = yield select(getSortedNotes);

  try {
    const {
      data: { note },
    } = yield call(notesAPI.updateNote, selectedNote._id, {
      is_deleted: true,
    });
    yield put(moveNoteToTrashSucceeded(note));
    yield put(noteUnselected());

    const noteToSelect = findNoteToSelect(notes, selectedNote);

    if (noteToSelect) {
      yield put(noteSelected(noteToSelect._id));
    }
  } catch (e) {
    yield put(moveNoteToTrashFailure(e));
  }
}
