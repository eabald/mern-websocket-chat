import { Action } from 'redux';
import { ResetAction } from '../root-types';

export const SIGN_IN_START = 'SIGN_IN_START';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_ERROR = 'SIGN_IN_ERROR';

export const SIGN_UP_START = 'SIGN_UP_START';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_ERROR = 'SIGN_UP_ERROR';

export const SIGN_OUT_START = 'SIGN_OUT_START';
export const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS';
export const SIGN_OUT_ERROR = 'SIGN_OUT_ERROR';

export const CLEAR_AUTH_ERROR = 'CLEAR_AUTH_ERROR';

export interface SignInStartAction extends Action {
  type: typeof SIGN_IN_START;
  payload: Credentials;
}

export interface SignInSuccessAction extends Action {
  type: typeof SIGN_IN_SUCCESS;
  payload: string;
}

export interface SignInErrorAction extends Action {
  type: typeof SIGN_IN_ERROR;
  payload: AuthError;
}

export interface SignUpStartAction extends Action {
  type: typeof SIGN_UP_START;
  payload: SignUpCredentials;
}

export interface SignUpSuccessAction extends Action {
  type: typeof SIGN_UP_SUCCESS;
  payload: string;
}

export interface SignUpErrorAction extends Action {
  type: typeof SIGN_UP_ERROR;
  payload: AuthError;
}

export interface SignOutStartAction extends Action {
  type: typeof SIGN_OUT_START;
}

export interface SignOutSuccessAction extends Action {
  type: typeof SIGN_OUT_SUCCESS;
}

export interface SignOutErrorAction extends Action {
  type: typeof SIGN_OUT_ERROR;
  payload: AuthError;
}

export interface ClearAuthErrorAction extends Action {
  type: typeof CLEAR_AUTH_ERROR;
}

export type AuthAction =
  | SignInStartAction
  | SignInSuccessAction
  | SignInErrorAction
  | SignUpStartAction
  | SignUpSuccessAction
  | SignUpErrorAction
  | SignOutStartAction
  | SignOutSuccessAction
  | SignOutErrorAction
  | ClearAuthErrorAction
  | ResetAction;

export interface Credentials {
  email: string;
  password: string;
}

export interface SignUpCredentials extends Credentials {
  username: string;
  firstName: string;
  lastName: string;
}

export interface AuthState {
  token: string | null;
  error: AuthError | null;
}

export interface AuthError {
  status: number;
  message: string;
}
