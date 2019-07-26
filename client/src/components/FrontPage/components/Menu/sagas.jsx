import { call, put, select } from 'redux-saga/effects';

import { tagsAPI } from '../../../../api';
import {
  TAG_DELETE_FAILURE,
  TAG_DELETE_SUCCEEDED,
} from '../TagsEditor/constants';
import { getSelectedNote } from '../../selectors';
import { unselectNoteAction } from '../../../Shared/actions';
import { selectDefaultNoteSaga } from '../../../Shared/sagas';

export function* deleteTagSaga(action) {
  const { tagId } = action.payload;

  try {
    yield call(tagsAPI.deleteTag, tagId);
    yield put({ type: TAG_DELETE_SUCCEEDED, payload: { tagId } });
  } catch (e) {
    yield put({ type: TAG_DELETE_FAILURE, error: e });
  }
}

export function* noteSelectionSaga() {
  const selectedNote = yield select(getSelectedNote);

  if (selectedNote) {
    yield put(unselectNoteAction());
  }

  yield selectDefaultNoteSaga();
}
