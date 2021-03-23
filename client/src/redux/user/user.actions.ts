// Types
import {
  GET_USER_ERROR,
  GET_USER_START,
  GET_USER_SUCCESS,
  GET_USER_DETAILS_ERROR,
  GET_USER_DETAILS_START,
  GET_USER_DETAILS_SUCCESS,
  User,
  UserError,
  UpdateUser,
  UPDATE_USER_START,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  UPDATE_UNREAD,
  UPDATE_READ,
  BLOCK_USER_START,
  BLOCK_USER_SUCCESS,
  BLOCK_USER_ERROR,
  UserStatus,
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

export const getUserDetailsStart = (id: string) => ({
  type: GET_USER_DETAILS_START,
  payload: id,
});

export const getUserDetailsSuccess = (user: User) => ({
  type: GET_USER_DETAILS_SUCCESS,
  payload: user,
});

export const getUserDetailsError = (error: UserError) => ({
  type: GET_USER_DETAILS_ERROR,
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

export const blockUserStart = (userId: string) => ({
  type: BLOCK_USER_START,
  payload: userId,
});

export const blockUserSuccess = (userStatus: UserStatus) => ({
  type: BLOCK_USER_SUCCESS,
  payload: userStatus,
})

export const blockUserError = (error: UserError) => ({
  type: BLOCK_USER_ERROR,
  payload: error,
})
