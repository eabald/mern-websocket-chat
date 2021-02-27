import {
  SIGN_IN_START,
  SIGN_UP_START,
  SIGN_OUT_START,
  SignInStartAction,
  SignUpStartAction,
  SignOutStartAction,
} from './auth.types';

import { takeLatest, put, all, call } from 'redux-saga/effects';
import {
  signInRequest,
  signUpRequest,
  signOutRequest,
} from '../../api/auth.api';
import {
  signInError,
  signInSuccess,
  signUpSuccess,
  signUpError,
  signOutSuccess,
  signOutError,
  clearAuthError,
} from './auth.actions';
import { getUserSuccess } from '../user/user.actions';
import { reset } from '../root-actions';

export function* signIn({ payload }: SignInStartAction) {
  try {
    const { token, user } = yield signInRequest(payload);
    yield put(signInSuccess(token));
    yield put(getUserSuccess(user));
    yield put(clearAuthError());
  } catch (error) {
    yield put(signInError(error.response.data));
  }
}

export function* signUp({ payload }: SignUpStartAction) {
  try {
    const { token, user } = yield signUpRequest(payload);
    yield put(signUpSuccess(token));
    yield put(getUserSuccess(user));
    yield put(clearAuthError());
  } catch (error) {
    yield put(signUpError(error.response.data));
  }
}

export function* signOut() {
  try {
    yield signOutRequest();
    yield put(signOutSuccess());
    yield put(reset());
  } catch (error) {
    yield put(signOutError(error.response.data));
  }
}

export function* onSignInStart() {
  yield takeLatest<SignInStartAction>(SIGN_IN_START, signIn);
}

export function* onSignUpStart() {
  yield takeLatest<SignUpStartAction>(SIGN_UP_START, signUp);
}

export function* onSignOutStart() {
  yield takeLatest<SignOutStartAction>(SIGN_OUT_START, signOut);
}

export function* authSagas() {
  yield all([call(onSignInStart), call(onSignUpStart), call(onSignOutStart)]);
}

export default authSagas;
