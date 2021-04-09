// External
import { Action } from 'redux';
// Types
import { ResetAction } from '../root-types';
import { FlashMessage } from '../utils/utils.types';

export const SIGN_IN_START = 'SIGN_IN_START';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_ERROR = 'SIGN_IN_ERROR';

export const SIGN_UP_START = 'SIGN_UP_START';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_ERROR = 'SIGN_UP_ERROR';

export const SIGN_OUT_START = 'SIGN_OUT_START';
export const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS';
export const SIGN_OUT_ERROR = 'SIGN_OUT_ERROR';

export const VERIFY_START = 'VERIFY_START';
export const VERIFY_SUCCESS = 'VERIFY_SUCCESS';
export const VERIFY_ERROR = 'VERIFY_ERROR';

export const CLEAR_AUTH_ERROR = 'CLEAR_AUTH_ERROR';

export interface SignInStartAction extends Action {
  type: typeof SIGN_IN_START;
  payload: Credentials;
}

export interface SignInSuccessAction extends Action {
  type: typeof SIGN_IN_SUCCESS;
  payload: {token: string, refreshToken: string};
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
  payload: {token: string, refreshToken: string};
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

export interface VerifyStartAction extends Action {
  type: typeof VERIFY_START;
  payload: string;
}

export interface VerifySuccessAction extends Action {
  type: typeof VERIFY_SUCCESS;
  payload: FlashMessage;
}

export interface VerifyErrorAction extends Action {
  type: typeof VERIFY_ERROR;
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
  | VerifyStartAction
  | VerifySuccessAction
  | VerifyErrorAction
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
  refreshToken: string | null;
}

export interface AuthError {
  status: number;
  message: string;
}
