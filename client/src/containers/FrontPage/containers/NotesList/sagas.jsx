import { call, put } from 'redux-saga/effects';
import { notesAPI } from '../../../../api';
import {
  PIN_FAILURE,
  PIN_SUCCEEDED,
  UNPIN_FAILURE,
  UNPIN_SUCCEEDED,
} from './constants';

export function* pinNote(action) {
  const { id } = action.payload;

  try {
    const { data: { note } } = yield call(notesAPI.pinNote, { id }, { withCredentials: true });
    yield put({ type: PIN_SUCCEEDED, payload: { note } });
  } catch (e) {
    yield put({ type: PIN_FAILURE, error: e });
  }
}

export function* unpinNote(action) {
  const { id } = action.payload;

  try {
    const { data: { note } } = yield call(notesAPI.unpinNote, { id }, { withCredentials: true });
    yield put({ type: UNPIN_SUCCEEDED, payload: { note } });
  } catch (e) {
    yield put({ type: UNPIN_FAILURE, error: e });
  }
}
