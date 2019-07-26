import { put, call, select } from 'redux-saga/effects';
import { notesAPI } from '../../../../api';
import {
  DELETE_NOTE_SUCCEEDED,
  MOVE_TO_TRASH_FAILURE,
  MOVE_TO_TRASH_SUCCEEDED,
  RESTORE_NOTE_FAILURE,
  RESTORE_NOTE_SUCCEEDED,
} from './constants';
import { NOTE_SELECTED } from '../../../Shared/constants';
import { getSelectedNote, getSortedNotes } from '../../selectors';
import { unselectNoteAction } from '../../../Shared/actions';

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
    yield put({ type: RESTORE_NOTE_SUCCEEDED, payload: { note } });
    yield put(unselectNoteAction());

    const noteToSelect = findNoteToSelect(notes, selectedNote);

    if (noteToSelect) {
      yield put({ type: NOTE_SELECTED, payload: { noteId: noteToSelect._id } });
    }
  } catch (e) {
    yield { type: RESTORE_NOTE_FAILURE, error: e };
  }
}

export function* deleteNote() {
  const selectedNote = yield select(getSelectedNote);
  const notes = yield select(getSortedNotes);

  try {
    const {
      data: { deleted },
    } = yield call(notesAPI.deleteNote, selectedNote._id);
    yield put({ type: DELETE_NOTE_SUCCEEDED, payload: { deleted } });
    yield put(unselectNoteAction());

    const noteToSelect = findNoteToSelect(notes, selectedNote);

    if (noteToSelect) {
      yield put({ type: NOTE_SELECTED, payload: { noteId: noteToSelect._id } });
    }
  } catch (e) {
    yield { type: RESTORE_NOTE_FAILURE, error: e };
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
    yield put({ type: MOVE_TO_TRASH_SUCCEEDED, payload: { note } });
    yield put(unselectNoteAction());

    const noteToSelect = findNoteToSelect(notes, selectedNote);

    if (noteToSelect) {
      yield put({ type: NOTE_SELECTED, payload: { noteId: noteToSelect._id } });
    }
  } catch (e) {
    yield { type: MOVE_TO_TRASH_FAILURE, error: e };
  }
}
