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
  VerifyStartAction,
  VERIFY_START,
  ResetPasswordStartAction,
  RESET_PASSWORD_START,
  ChangePasswordStartAction,
  CHANGE_PASSWORD_START,
  AuthError,
} from './auth.types';
// Api
import {
  signInRequest,
  signUpRequest,
  signOutRequest,
  verifyEmailRequest,
  resetPasswordRequest,
  changePasswordRequest,
} from '../../api/auth.api';
// Actions
import {
  signInError,
  signInSuccess,
  signUpError,
  signOutStart,
  signOutSuccess,
  signOutError,
  clearAuthError,
  verifyError,
  resetPasswordError,
  changePasswordError,
} from './auth.actions';
import { getUserSuccess } from '../user/user.actions';
import { setFlashMessage, updateLoading, reset } from '../utils/utils.actions';
import history from '../history';

export function* signIn({ payload }: SignInStartAction) {
  try {
    yield put(updateLoading(true));
    const { token, user } = yield signInRequest(payload);
    yield put(signInSuccess({ token }));
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
    yield put(updateLoading(true));
    const { status, message } = yield signUpRequest(payload);
    yield put(setFlashMessage({ status, message }));
    history.push('/login');
    yield put(clearAuthError());
    yield put(updateLoading(false));
  } catch (error) {
    yield put(updateLoading(false));
    yield put(signUpError(error.response.data));
  }
}

export function* signOut() {
  try {
    yield put(updateLoading(true));
    yield signOutRequest();
    yield put(signOutSuccess());
    yield put(reset());
    yield put(updateLoading(false));
  } catch (error) {
    yield put(updateLoading(false));
    yield put(signOutError(error.response.data));
  }
}

export function* verify({ payload }: VerifyStartAction) {
  try {
    yield put(updateLoading(true));
    const { status, message } = yield verifyEmailRequest(payload);
    yield put(setFlashMessage({ status, message }));
    history.push('/login');
    yield put(clearAuthError());
    yield put(updateLoading(false));
  } catch (error) {
    yield put(updateLoading(false));
    yield put(verifyError(error.response.data));
  }
}

export function* resetPassword({ payload }: ResetPasswordStartAction) {
  try {
    yield put(updateLoading(true));
    const { status, message } = yield resetPasswordRequest(payload);
    yield put(setFlashMessage({ status, message }));
    yield put(clearAuthError());
    yield put(updateLoading(false));
  } catch (error) {
    yield put(updateLoading(false));
    yield put(resetPasswordError(error.response.data));
  }
}

export function* changePassword({ payload }: ChangePasswordStartAction) {
  try {
    yield put(updateLoading(true));
    const { status, message } = yield changePasswordRequest(payload);
    yield put(setFlashMessage({ status, message }));
    history.push('/login');
    yield put(clearAuthError());
    yield put(updateLoading(false));
  } catch (error) {
    yield put(updateLoading(false));
    yield put(changePasswordError(error.response.data));
  }
}

export function* checkForUnauthorized(error: AuthError) {
  if (error.status === 401) {
    yield put(signOutStart());
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

export function* onVerifyStart() {
  yield takeLatest<VerifyStartAction>(VERIFY_START, verify);
}

export function* onResetPasswordStart() {
  yield takeLatest<ResetPasswordStartAction>(
    RESET_PASSWORD_START,
    resetPassword
  );
}

export function* onChangePasswordStart() {
  yield takeLatest<ChangePasswordStartAction>(
    CHANGE_PASSWORD_START,
    changePassword
  );
}

export function* authSagas() {
  yield all([
    call(onSignInStart),
    call(onSignUpStart),
    call(onSignOutStart),
    call(onVerifyStart),
    call(onResetPasswordStart),
    call(onChangePasswordStart),
  ]);
}

export default authSagas;
