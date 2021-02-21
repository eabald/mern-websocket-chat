import { takeLatest, put, all, call } from 'redux-saga/effects';
import { getUserRequest, getUsersRequest } from '../../api/user.api';
import { getUserError, getUsersError, getUsersSuccess, getUserSuccess } from './user.actions';
import { GetUserStartAction, GET_USERS_START, GET_USER_START } from './user.types';

export function* getUser({ payload }: GetUserStartAction) {
  try {
    const { user } = yield getUserRequest(payload);
    yield put(getUserSuccess(user));
  } catch (error) {
    yield put(getUserError(error));
  }
}

export function* getUsers() {
  try {
    const { users } = yield getUsersRequest();
    yield put(getUsersSuccess(users));
  } catch (error) {
    yield put(getUsersError(error));
  }
}

export function* onGetUserStart() {
  yield takeLatest(GET_USER_START, getUser);
}

export function* onGetUsersStart() {
  yield takeLatest(GET_USERS_START, getUsers);
}

export function* userSagas() {
  yield all([call(onGetUserStart), call(onGetUsersStart)]);
}

export default userSagas;