import { call, put, takeLatest } from 'redux-saga/effects';
import { INIT } from './constants';
import { fetchDataAction } from '../FrontPage/actions';
import { fetchUserAction } from '../User/actions';
import { getAccessToken } from '../../utils/jwt';

function* initSaga() {
  if (yield call(getAccessToken)) {
    yield put(fetchUserAction());
    yield put(fetchDataAction());
  }
}

export default function* initWatcher() {
  yield takeLatest(INIT, initSaga);
}
