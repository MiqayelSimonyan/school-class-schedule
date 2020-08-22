import { all } from 'redux-saga/effects';

import { saga as authSaga } from 'ducks/auth';
import { saga as teacherSaga } from 'ducks/teacher';

export default function* rootSaga() {
  yield all([
    authSaga(),
    teacherSaga()
  ])
};