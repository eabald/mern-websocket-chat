// External
import { Action } from 'redux';
// Root types
import { ResetAction } from '../utils/utils.types';

export const GET_USER_START = 'GET_USER_START';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_ERROR = 'GET_USER_ERROR';

export const GET_USER_DETAILS_START = 'GET_USER_DETAILS_START';
export const GET_USER_DETAILS_SUCCESS = 'GET_USER_DETAILS_SUCCESS';
export const GET_USER_DETAILS_ERROR = 'GET_USER_DETAILS_ERROR';

export const UPDATE_USER_START = 'UPDATE_USER_START';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_ERROR = 'UPDATE_USER_ERROR';

export const BLOCK_USER_START = 'BLOCK_USER_START';
export const BLOCK_USER_SUCCESS = 'BLOCK_USER_SUCCESS';
export const BLOCK_USER_ERROR = 'BLOCK_USER_ERROR';

export const UPDATE_UNREAD = 'UPDATE_UNREAD';
export const UPDATE_READ = 'UPDATE_READ';

export const INVITE_USER_START = 'INVITE_USER_START';
export const INVITE_USER_SUCCESS = 'INVITE_USER_SUCCESS';
export const INVITE_USER_ERROR = 'INVITE_USER_ERROR';

export const CLEAR_USER_ERROR = 'CLEAR_USER_ERROR';

export interface GetUserStartAction extends Action {
  type: typeof GET_USER_START;
  payload: string;
}

export interface GetUserSuccessAction extends Action {
  type: typeof GET_USER_SUCCESS;
  payload: User;
}

export interface GetUserDetailsStartAction extends Action {
  type: typeof GET_USER_DETAILS_START;
  payload: string;
}

export interface GetUserDetailsSuccessAction extends Action {
  type: typeof GET_USER_DETAILS_SUCCESS;
  payload: User;
}

export interface GetUserDetailsErrorAction extends Action {
  type: typeof GET_USER_DETAILS_ERROR;
  payload: UserError;
}

export interface GetUserErrorAction extends Action {
  type: typeof GET_USER_ERROR;
  payload: UserError;
}

export interface UpdateUserStartAction extends Action {
  type: typeof UPDATE_USER_START;
  payload: UpdateUser;
}

export interface UpdateUserSuccessAction extends Action {
  type: typeof UPDATE_USER_SUCCESS;
  payload: User;
}

export interface UpdateUserErrorAction extends Action {
  type: typeof UPDATE_USER_ERROR;
  payload: UserError;
}

export interface UpdateUnreadAction extends Action {
  type: typeof UPDATE_UNREAD;
  payload: string;
}

export interface UpdateReadAction extends Action {
  type: typeof UPDATE_READ;
  payload: string;
}

export interface BlockUserStartAction extends Action {
  type: typeof BLOCK_USER_START;
  payload: string;
}

export interface BlockUserSuccessAction extends Action {
  type: typeof BLOCK_USER_SUCCESS;
  payload: UserStatus;
}

export interface BlockUserErrorAction extends Action {
  type: typeof BLOCK_USER_ERROR;
  payload: UserError;
}

export interface InviteUserStartAction extends Action {
  type: typeof INVITE_USER_START;
  payload: string;
}

export interface InviteUserSuccessAction extends Action {
  type: typeof INVITE_USER_SUCCESS;
  payload: User;
}

export interface InviteUserErrorAction extends Action {
  type: typeof INVITE_USER_ERROR;
  payload: UserError;
}

export interface ClearAuthErrorAction extends Action {
  type: typeof CLEAR_USER_ERROR;
}

export type UserAction =
  | GetUserStartAction
  | GetUserSuccessAction
  | GetUserErrorAction
  | GetUserDetailsStartAction
  | GetUserDetailsSuccessAction
  | GetUserDetailsErrorAction
  | UpdateUserStartAction
  | UpdateUserSuccessAction
  | UpdateUserErrorAction
  | UpdateUnreadAction
  | UpdateReadAction
  | BlockUserStartAction
  | BlockUserSuccessAction
  | BlockUserErrorAction
  | InviteUserStartAction
  | InviteUserSuccessAction
  | InviteUserErrorAction
  | ClearAuthErrorAction
  | ResetAction;

export interface UserState {
  user: User | null;
  users: User[];
  error: UserError | null;
  unread: string[];
}

export interface UserError {
  status: number;
  message: string;
}

export interface UserStatus {
  status: string;
  message: string;
}

export interface FOMO {
  invitations: number;
  invitationsFulfilled: number;
  roomsLimit: number;
}

export interface User {
  _id: string;
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email?: string;
  password: string;
  socketId: string;
  rooms: any[];
  fomo: FOMO;
}

export interface UpdateUser {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}
