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
} from './auth.types';

export const signInStart = (credentials: Credentials) => ({
  type: SIGN_IN_START,
  payload: credentials,
});

export const signInSuccess = (token: string) => ({
  type: SIGN_IN_SUCCESS,
  payload: token,
});

export const signInError = (error: AuthError) => ({
  type: SIGN_IN_ERROR,
  payload: error,
});

export const signUpStart = (signUpCredentials: SignUpCredentials) => ({
  type: SIGN_UP_START,
  payload: signUpCredentials,
});

export const signUpSuccess = (token: string) => ({
  type: SIGN_UP_SUCCESS,
  payload: token,
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
