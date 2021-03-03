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
} from './auth.types';

export const signInStart = (credentials: Credentials) => ({
  type: SIGN_IN_START,
  payload: credentials,
});

export const signInSuccess = (tokens: {token: string, refreshToken: string}) => ({
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

export const signUpSuccess = (tokens: {token: string, refreshToken: string}) => ({
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

export const clearAuthError = () => ({
  type: CLEAR_AUTH_ERROR,
})
