import { call, put, select } from 'redux-saga/effects';

import { tagsAPI } from '../../../../api';
import { getSelectedNote } from '../../selectors';
import { noteUnselected } from '../../../Shared/actions';
import { selectDefaultNoteSaga } from '../../../Shared/sagas';
import { deleteTagFailure, deleteTagSucceeded } from '../TagsEditor/actions';

export function* deleteTagSaga(action) {
  const { tagId } = action.payload;

  try {
    yield call(tagsAPI.deleteTag, tagId);
    yield put(deleteTagSucceeded(tagId));
  } catch (e) {
    yield put(deleteTagFailure());
  }
}

export function* noteSelectionSaga() {
  const selectedNote = yield select(getSelectedNote);

  if (selectedNote) {
    yield put(noteUnselected());
  }

  yield selectDefaultNoteSaga();
}
