import { select, put, all, call } from 'redux-saga/effects';

import { getSortedNotes } from '../FrontPage/selectors';
import { noteSelected } from './actions';
import { authAPI, notesAPI, tagsAPI } from '../../api';

export function* selectDefaultNoteSaga() {
  const notes = yield select(getSortedNotes);
  if (notes.length) {
    yield put(noteSelected(notes[0]._id));
  }
}

export function* fetchData() {
  const { notesResponse, tagsResponse, userResponse } = yield all({
    userResponse: call(authAPI.getUser),
    notesResponse: call(notesAPI.fetchNotes),
    tagsResponse: call(tagsAPI.fetchTags),
  });

  const { user } = userResponse.data;
  const { notes } = notesResponse.data;
  const { tags } = tagsResponse.data;

  return {
    user,
    notes,
    tags,
  };
}
