import { select, put } from 'redux-saga/effects';

import { getSelectedNote, getSortedNotes } from '../../selectors';
import { noteSelected, noteUnselected } from '../../../Shared/actions';

// eslint-disable-next-line import/prefer-default-export
export function* searchSaga() {
  const notes = yield select(getSortedNotes);
  const selectedNote = yield select(getSelectedNote);
  const selectedNoteId = selectedNote && selectedNote._id;

  if (notes.length) {
    const index = notes.findIndex(n => n._id === selectedNoteId);

    if (index < 0 || !selectedNote) {
      yield put(noteUnselected());
      yield put(noteSelected(notes[0]._id));
    }
  } else if (selectedNoteId) {
    yield put(noteUnselected());
  }
}
