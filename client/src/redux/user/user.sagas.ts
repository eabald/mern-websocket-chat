// External
import { takeLatest, put, all, call } from 'redux-saga/effects';
// Api
import {
  getUserRequest,
  updateUserRequest,
} from '../../api/user.api';
// Types
import {
  getUserDetailsError,
  getUserDetailsSuccess,
  updateUserError,
  updateUserSuccess,
} from './user.actions';
import {
  GetUserDetailsStartAction,
  GET_USER_DETAILS_START,
  UpdateUserStartAction,
  UPDATE_USER_START,
} from './user.types';
// Utils
import { checkForUnauthorized } from '../sagas.utils';

export function* getUserDetails({ payload }: GetUserDetailsStartAction) {
  try {
    const { user } = yield getUserRequest(payload);
    yield put(getUserDetailsSuccess(user));
  } catch (error) {
    yield checkForUnauthorized(error.response.data);
    yield put(getUserDetailsError(error.response.data));
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

export function* onGetUserDetailsStart() {
  yield takeLatest(GET_USER_DETAILS_START, getUserDetails);
}

export function* onUpdateUserStart() {
  yield takeLatest(UPDATE_USER_START, updateUser);
}

export function* userSagas() {
  yield all([
    call(onGetUserDetailsStart),
    call(onUpdateUserStart),
  ]);
}

export default userSagas;
