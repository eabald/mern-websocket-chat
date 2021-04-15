// Types
import {
  AuthError,
  Credentials,
  SignUpCredentials,
  SIGN_IN_ERROR,
  SIGN_IN_START,
  SIGN_IN_SUCCESS,
  SIGN_UP_ERROR,
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
  SIGN_OUT_START,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_ERROR,
  CLEAR_AUTH_ERROR,
  VERIFY_START,
  VERIFY_SUCCESS,
  VERIFY_ERROR,
  RESET_PASSWORD_START,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  CHANGE_PASSWORD_START,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERROR,
  ResetPasswordData,
  ChangePasswordData,
} from './auth.types';

export const signInStart = (credentials: Credentials) => ({
  type: SIGN_IN_START,
  payload: credentials,
});

export const signInSuccess = (tokens: {
  token: string;
}) => ({
  type: SIGN_IN_SUCCESS,
  payload: tokens,
});

export const signInError = (error: AuthError) => ({
  type: SIGN_IN_ERROR,
  payload: error,
});

export const signUpStart = (signUpCredentials: SignUpCredentials) => ({
  type: SIGN_UP_START,
  payload: signUpCredentials,
});

export const signUpSuccess = (tokens: {
  token: string;
  refreshToken: string;
}) => ({
  type: SIGN_UP_SUCCESS,
  payload: tokens,
});

export const signUpError = (error: AuthError) => ({
  type: SIGN_UP_ERROR,
  payload: error,
});

export const signOutStart = () => ({
  type: SIGN_OUT_START,
});

export const signOutSuccess = () => ({
  type: SIGN_OUT_SUCCESS,
  payload: null,
});

export const signOutError = (error: AuthError) => ({
  type: SIGN_OUT_ERROR,
  payload: error,
});

export const verifyStart = (token: string) => ({
  type: VERIFY_START,
  payload: token,
});

export const verifySuccess = () => ({
  type: VERIFY_SUCCESS,
});

export const verifyError = (error: AuthError) => ({
  type: VERIFY_ERROR,
  payload: error,
});

export const resetPasswordStart = (resetPasswordData: ResetPasswordData) => ({
  type: RESET_PASSWORD_START,
  payload: resetPasswordData,
});

export const resetPasswordSuccess = () => ({
  type: RESET_PASSWORD_SUCCESS,
});

export const resetPasswordError = (error: AuthError) => ({
  type: RESET_PASSWORD_ERROR,
  payload: error,
});

export const changePasswordStart = (changePasswordData: ChangePasswordData) => ({
  type: CHANGE_PASSWORD_START,
  payload: changePasswordData,
});

export const changePasswordSuccess = () => ({
  type: CHANGE_PASSWORD_SUCCESS,
});

export const changePasswordError = (error: AuthError) => ({
  type: CHANGE_PASSWORD_ERROR,
  payload: error,
});

export const clearAuthError = () => ({
  type: CLEAR_AUTH_ERROR,
});
