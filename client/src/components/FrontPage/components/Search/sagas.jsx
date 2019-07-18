import { select, put } from 'redux-saga/effects';

import { getSelectedNote, getSortedNotes } from '../../selectors';
import { NOTE_SELECTED, NOTE_UNSELECTED } from '../NotesList/constants';

// eslint-disable-next-line import/prefer-default-export
export function* searchSaga() {
  const notes = yield select(getSortedNotes);
  const selectedNote = yield select(getSelectedNote);
  const selectedNoteId = selectedNote && selectedNote._id;

  if (notes.length) {
    const index = notes.findIndex(n => n._id === selectedNoteId);

    if (index < 0 || !selectedNote) {
      yield put({ type: NOTE_UNSELECTED });
      yield put({ type: NOTE_SELECTED, payload: { noteId: notes[0]._id } });
    }
  } else if (selectedNoteId) {
    yield put({ type: NOTE_UNSELECTED });
  }
}
