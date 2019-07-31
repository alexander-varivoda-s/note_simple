import { put, call, select } from 'redux-saga/effects';

import { notesAPI } from '../../../../api';
import { getSelectedNote } from '../../selectors';
import { noteUnselected } from '../../../Shared/actions';
import { emptyTrashFailure, emptyTrashSucceeded } from './actions';

// eslint-disable-next-line import/prefer-default-export
export function* emptyTrashSaga() {
  const selectedNote = yield select(getSelectedNote);

  try {
    yield call(notesAPI.emptyTrash);
    if (selectedNote) {
      yield put(noteUnselected());
    }
    yield put(emptyTrashSucceeded());
  } catch (e) {
    yield put(emptyTrashFailure(e));
  }
}
