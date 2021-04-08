// External
import { takeLatest, put, all, call } from 'redux-saga/effects';
// Types
import {
  SIGN_IN_START,
  SIGN_UP_START,
  SIGN_OUT_START,
  SignInStartAction,
  SignUpStartAction,
  SignOutStartAction,
} from './auth.types';
// Api
import {
  signInRequest,
  signUpRequest,
  signOutRequest,
} from '../../api/auth.api';
// Actions
import {
  signInError,
  signInSuccess,
  signUpError,
  signOutSuccess,
  signOutError,
  clearAuthError,
} from './auth.actions';
import { getUserSuccess } from '../user/user.actions';
import { reset } from '../root-actions';
import { setFlashMessage, updateLoading } from '../utils/utils.actions';
import history from '../history';

export function* signIn({ payload }: SignInStartAction) {
  try {
    yield put(updateLoading(true));
    const { token, refreshToken, user } = yield signInRequest(payload);
    yield put(signInSuccess({ token, refreshToken }));
    yield put(getUserSuccess(user));
    yield put(clearAuthError());
    yield put(updateLoading(false));
  } catch (error) {
    yield put(updateLoading(false));
    yield put(signInError(error.response.data));
  }
}

export function* signUp({ payload }: SignUpStartAction) {
  try {
    const { status, message } = yield signUpRequest(payload);
    yield put(setFlashMessage({ status, message }));
    history.push('/login');
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
