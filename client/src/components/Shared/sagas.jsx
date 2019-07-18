import { select, put } from 'redux-saga/effects';

import { getSortedNotes } from '../FrontPage/selectors';
import { selectNoteAction } from '../FrontPage/components/NotesList/actions';

// eslint-disable-next-line import/prefer-default-export
export function* selectDefaultNoteSaga() {
  const notes = yield select(getSortedNotes);
  if (notes.length) {
    yield put(selectNoteAction(notes[0]._id));
  }
}
