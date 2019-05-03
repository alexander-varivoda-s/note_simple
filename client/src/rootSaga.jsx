import { all } from 'redux-saga/effects';

import loginSaga from './containers/LoginPage/sagas';

export default function* rootSaga() {
  yield all([loginSaga()]);
}
