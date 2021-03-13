// Types
import {
  GET_USER_ERROR,
  GET_USER_START,
  GET_USER_SUCCESS,
  GET_USERS_ERROR,
  GET_USERS_START,
  GET_USERS_SUCCESS,
  User,
  UserError,
  UpdateUser,
  UPDATE_USER_START,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  UPDATE_UNREAD,
  UPDATE_READ,
} from './user.types';

export const getUserStart = (id: string) => ({
  type: GET_USER_START,
  payload: id,
});

export const getUserSuccess = (user: User) => ({
  type: GET_USER_SUCCESS,
  payload: user,
});

export const getUserError = (error: UserError) => ({
  type: GET_USER_ERROR,
  payload: error,
});

export const getUsersStart = () => ({
  type: GET_USERS_START,
});

export const getUsersSuccess = (users: User[]) => ({
  type: GET_USERS_SUCCESS,
  payload: users,
});

export const getUsersError = (error: UserError) => ({
  type: GET_USERS_ERROR,
  payload: error,
});

export const updateUserStart = (user: UpdateUser) => ({
  type: UPDATE_USER_START,
  payload: user,
});

export const updateUserSuccess = (user: User) => ({
  type: UPDATE_USER_SUCCESS,
  payload: user,
});

export const updateUserError = (error: UserError) => ({
  type: UPDATE_USER_ERROR,
  payload: error,
});

export const updateUnread = (roomId: string) => ({
  type: UPDATE_UNREAD,
  payload: roomId,
});

export const updateRead = (roomId: string) => ({
  type: UPDATE_READ,
  payload: roomId,
});
