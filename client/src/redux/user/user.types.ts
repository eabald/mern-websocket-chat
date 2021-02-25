import { Action } from 'redux';
import { ResetAction } from '../root-types';

export const GET_USER_START = 'GET_USER_START';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_ERROR = 'GET_USER_ERROR';

export const GET_USERS_START = 'GET_USERS_START';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_ERROR = 'GET_USERS_ERROR';

export interface GetUserStartAction extends Action {
  type: typeof GET_USER_START,
  payload: string,
}

export interface GetUserSuccessAction extends Action {
  type: typeof GET_USER_SUCCESS,
  payload: User,
}

export interface GetUserErrorAction extends Action {
  type: typeof GET_USER_ERROR,
  payload: UserError,
}
export interface GetUsersStartAction extends Action {
  type: typeof GET_USERS_START,
}

export interface GetUsersSuccessAction extends Action {
  type: typeof GET_USERS_SUCCESS,
  payload: User[],
}

export interface GetUsersErrorAction extends Action {
  type: typeof GET_USERS_ERROR,
  payload: UserError,
}

export type UserAction =
  | GetUserStartAction
  | GetUserSuccessAction
  | GetUserErrorAction
  | GetUsersStartAction
  | GetUsersSuccessAction
  | GetUsersErrorAction
  | ResetAction;

export interface UserState {
  user: User | null;
  users: User[];
  error: UserError | string | null;
}

export interface UserError {
  status: number;
  message: string;
}

export interface User {
  _id: string;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  socketId: string;
  rooms: any[];
  save: any;
}
