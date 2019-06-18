import { call, put, select } from 'redux-saga/effects';
import { notesAPI } from '../../../../api';
import {
  PIN_FAILURE,
  PIN_SUCCEEDED,
  UNPIN_FAILURE,
  UNPIN_SUCCEEDED,
} from './constants';
import { getSelectedNoteId } from '../../selectors';
import { selectNoteAction } from './actions';

function* selectNote(noteId) {
  const selectedNoteId = yield select(getSelectedNoteId);

  if (selectedNoteId && selectedNoteId !== noteId) {
    yield put(selectNoteAction(noteId));
  }
}

export function* pinNote(action) {
  const { id } = action.payload;

  try {
    const {
      data: { note },
    } = yield call(notesAPI.pinNote, { id }, { withCredentials: true });
    yield put({ type: PIN_SUCCEEDED, payload: { note } });
    yield selectNote(id);
  } catch (e) {
    yield put({ type: PIN_FAILURE, error: e });
  }
}

export function* unpinNote(action) {
  const { id } = action.payload;

  try {
    const {
      data: { note },
    } = yield call(notesAPI.unpinNote, { id }, { withCredentials: true });
    yield put({ type: UNPIN_SUCCEEDED, payload: { note } });
    yield selectNote(id);
  } catch (e) {
    yield put({ type: UNPIN_FAILURE, error: e });
  }
}
