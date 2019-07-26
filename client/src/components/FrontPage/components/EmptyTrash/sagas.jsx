import { put, call, select } from 'redux-saga/effects';

import { notesAPI } from '../../../../api';
import { EMPTY_TRASH_SUCCEEDED } from '../../../Shared/constants';
import { EMPTY_TRASH_FAILURE } from './constants';
import { getSelectedNote } from '../../selectors';
import { unselectNoteAction } from '../../../Shared/actions';

// eslint-disable-next-line import/prefer-default-export
export function* emptyTrashSaga() {
  const selectedNote = yield select(getSelectedNote);

  try {
    yield call(notesAPI.emptyTrash);
    if (selectedNote) {
      yield put(unselectNoteAction());
    }
    yield put({ type: EMPTY_TRASH_SUCCEEDED });
  } catch (e) {
    yield put({ type: EMPTY_TRASH_FAILURE, error: e });
  }
}
