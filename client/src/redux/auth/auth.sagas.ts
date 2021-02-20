import {
  SIGN_IN_START,
  SIGN_UP_START,
  SignInStartAction,
  SignUpStartAction,
} from './auth.types';

import { takeLatest, put, all, call } from 'redux-saga/effects';
import { signInRequest, signUpRequest } from '../../api/auth.api';
import {
  signInError,
  signInSuccess,
  signUpSuccess,
  signUpError,
} from './auth.actions';

export function* signIn({ payload }: SignInStartAction) {
  try {
    const { token } = yield signInRequest(payload);
    yield put(signInSuccess(token));
  } catch (error) {
    yield put(signInError(error));
  }
}

export function* signUp({ payload }: SignUpStartAction) {
  try {
    const { token } = yield signUpRequest(payload);
    yield put(signUpSuccess(token));
  } catch (error) {
    yield put(signUpError(error));
  }
}

export function* onSignInStart() {
  yield takeLatest<SignInStartAction>(SIGN_IN_START, signIn);
}

export function* onSignUpStart() {
  yield takeLatest<SignUpStartAction>(SIGN_UP_START, signUp);
}

export function* authSagas() {
  yield all([call(onSignInStart), call(onSignUpStart)]);
}

export default authSagas;
