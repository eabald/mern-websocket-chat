import { takeLatest, put, all, call } from 'redux-saga/effects';
import { getUserRequest } from '../../api/user.api';
import { getUserError, getUserSuccess } from './user.actions';
import { GetUserStartAction, GET_USER_START } from './user.types';

export function* getUser({ payload }: GetUserStartAction) {
  try {
    const { user } = yield getUserRequest(payload);
    yield put(getUserSuccess(user));
  } catch (error) {
    yield put(getUserError(error));
  }
}

export function* onGetUserStart() {
  yield takeLatest(GET_USER_START, getUser);
}

export function* userSagas() {
  yield all([call(onGetUserStart)]);
}

export default userSagas;
