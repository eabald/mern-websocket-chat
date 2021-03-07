// External
import { takeLatest, put, all, call } from 'redux-saga/effects';
// Api
import {
  getUserRequest,
  getUsersRequest,
  updateUserRequest,
} from '../../api/user.api';
// Types
import {
  getUserError,
  getUsersError,
  getUsersSuccess,
  getUserSuccess,
  updateUserError,
  updateUserSuccess,
} from './user.actions';
import {
  GetUserStartAction,
  GET_USERS_START,
  GET_USER_START,
  UpdateUserStartAction,
  UPDATE_USER_START,
} from './user.types';
// Utils
import { checkForUnauthorized } from '../sagas.utils';

export function* getUser({ payload }: GetUserStartAction) {
  try {
    const { user } = yield getUserRequest(payload);
    yield put(getUserSuccess(user));
  } catch (error) {
    yield checkForUnauthorized(error.response.data);
    yield put(getUserError(error.response.data));
  }
}

export function* getUsers() {
  try {
    const { users } = yield getUsersRequest();
    yield put(getUsersSuccess(users));
  } catch (error) {
    yield checkForUnauthorized(error.response.data);
    yield put(getUsersError(error.response.data));
  }
}

export function* updateUser({ payload }: UpdateUserStartAction) {
  try {
    const { user } = yield updateUserRequest(payload);
    yield put(updateUserSuccess(user));
  } catch (error) {
    yield put(updateUserError(error));
  }
}

export function* onGetUserStart() {
  yield takeLatest(GET_USER_START, getUser);
}

export function* onGetUsersStart() {
  yield takeLatest(GET_USERS_START, getUsers);
}

export function* onUpdateUserStart() {
  yield takeLatest(UPDATE_USER_START, updateUser);
}

export function* userSagas() {
  yield all([
    call(onGetUserStart),
    call(onGetUsersStart),
    call(onUpdateUserStart),
  ]);
}

export default userSagas;
