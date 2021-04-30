// External
import { takeLatest, put, all, call } from 'redux-saga/effects';
// Api
import {
  getUserRequest,
  updateUserRequest,
  blockUserRequest,
  inviteNewUserRequest,
} from '../../api/user.api';
// Types
import {
  blockUserError,
  blockUserSuccess,
  getUserDetailsError,
  getUserDetailsSuccess,
  inviteUserError,
  inviteUserSuccess,
  updateUserError,
  updateUserSuccess,
} from './user.actions';
import {
  BlockUserStartAction,
  BLOCK_USER_START,
  GetUserDetailsStartAction,
  GET_USER_DETAILS_START,
  InviteUserStartAction,
  INVITE_USER_START,
  UpdateUserStartAction,
  UPDATE_USER_START,
} from './user.types';
// Utils
import { checkForUnauthorized } from '../auth/auth.sagas';
import { setFlashMessage, updateLoading } from '../utils/utils.actions';

export function* getUserDetails({ payload }: GetUserDetailsStartAction) {
  try {
    yield put(updateLoading(true));
    const { user } = yield getUserRequest(payload);
    yield put(getUserDetailsSuccess(user));
    yield put(updateLoading(false));
  } catch (error) {
    yield checkForUnauthorized(error.response.data);
    yield put(updateLoading(false));
    yield put(getUserDetailsError(error.response.data));
  }
}

export function* updateUser({ payload }: UpdateUserStartAction) {
  try {
    yield put(updateLoading(true));
    const { user } = yield updateUserRequest(payload);
    yield put(updateUserSuccess(user));
    yield put(updateLoading(false));
  } catch (error) {
    yield checkForUnauthorized(error.response.data);
    yield put(updateLoading(false));
    yield put(updateUserError(error));
  }
}

export function* blockUser({ payload }: BlockUserStartAction) {
  try {
    yield put(updateLoading(true));
    const { status } = yield blockUserRequest(payload);
    yield put(blockUserSuccess(status));
    yield put(setFlashMessage(status));
    yield put(updateLoading(false));
  } catch (error) {
    yield checkForUnauthorized(error.response.data);
    yield put(updateLoading(false));
    yield put(blockUserError(error.response.data));
  }
}

export function* inviteNewUser({ payload }: InviteUserStartAction) {
  try {
    yield put(updateLoading(true));
    const { status, message, user } = yield inviteNewUserRequest(payload);
    yield put(inviteUserSuccess({ status, message }));
    yield put(setFlashMessage({ status, message }));
    yield put(updateUserSuccess(user));
    yield put(updateLoading(false));
  } catch (error) {
    yield checkForUnauthorized(error.response.data);
    yield put(updateLoading(false));
    yield put(inviteUserError(error.response.data));
  }
}

export function* onGetUserDetailsStart() {
  yield takeLatest(GET_USER_DETAILS_START, getUserDetails);
}

export function* onUpdateUserStart() {
  yield takeLatest(UPDATE_USER_START, updateUser);
}

export function* onBlockUserStart() {
  yield takeLatest(BLOCK_USER_START, blockUser);
}

export function* onInviteNewUserStart() {
  yield takeLatest(INVITE_USER_START, inviteNewUser);
}

export function* userSagas() {
  yield all([
    call(onGetUserDetailsStart),
    call(onUpdateUserStart),
    call(onBlockUserStart),
    call(onInviteNewUserStart),
  ]);
}

export default userSagas;
