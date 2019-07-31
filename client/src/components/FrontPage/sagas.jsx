import { takeLatest, takeEvery } from 'redux-saga/effects';
import { pinNote, unpinNote } from './components/NotesList/sagas';
import {
  deleteNote,
  restoreNote,
  moveToTrash,
} from './components/Toolbar/sagas';
import { saveNoteSaga } from './components/NoteEditor/sagas';
import { tagNoteSaga, untagNoteSaga } from './components/TagsEditor/sagas';
import { deleteTagSaga, noteSelectionSaga } from './components/Menu/sagas';
import { searchSaga } from './components/Search/sagas';
import { emptyTrashSaga } from './components/EmptyTrash/sagas';
import { addNoteSaga } from './components/AddNote/sagas';

export default function* frontPageSaga() {
  yield takeEvery('PIN', pinNote);
  yield takeEvery('UNPIN', unpinNote);
  yield takeEvery('SAVE_NOTE', saveNoteSaga);
  yield takeEvery('TAG_NOTE', tagNoteSaga);
  yield takeEvery('UNTAG_NOTE', untagNoteSaga);
  yield takeEvery('DELETE_TAG', deleteTagSaga);
  yield takeEvery('MOVE_NOTE_TO_TRASH', moveToTrash);
  yield takeLatest('RESTORE_NOTE', restoreNote);
  yield takeLatest('DELETE_NOTE', deleteNote);
  yield takeEvery('FILTER_NOTES', noteSelectionSaga);
  yield takeEvery('SEARCH', searchSaga);
  yield takeEvery('EMPTY_TRASH', emptyTrashSaga);
  yield takeEvery('ADD_NOTE', addNoteSaga);
}
