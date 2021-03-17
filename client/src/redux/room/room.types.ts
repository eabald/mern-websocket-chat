// External
import { Action } from 'redux';
// Types
import { ResetAction } from '../root-types';
import { User } from '../user/user.types';

export const CREATE_ROOM_START = 'CREATE_ROOM_START';
export const CREATE_ROOM_SUCCESS = 'CREATE_ROOM_SUCCESS';
export const CREATE_ROOM_ERROR = 'CREATE_ROOM_ERROR';

export const GET_ROOMS_START = 'GET_ROOMS_START';
export const GET_ROOMS_SUCCESS = 'GET_ROOMS_SUCCESS';
export const GET_ROOMS_ERROR = 'GET_ROOMS_ERROR';

export const GET_ROOM_START = 'GET_ROOM_START';
export const GET_ROOM_SUCCESS = 'GET_ROOM_SUCCESS';
export const GET_ROOM_ERROR = 'GET_ROOM_ERROR';

export const SET_CURRENT_ROOM_START = 'SET_CURRENT_ROOM_START';
export const SET_CURRENT_ROOM_SUCCESS = 'SET_CURRENT_ROOM_SUCCESS';
export const SET_CURRENT_ROOM_ERROR = 'SET_CURRENT_ROOM_ERROR';

export const SET_UNREAD_MESSAGES = 'SET_UNREAD_MESSAGES';

export interface CreateRoomStart extends Action {
  type: typeof CREATE_ROOM_START;
  payload: Room;
}

export interface CreateRoomSuccess extends Action {
  type: typeof CREATE_ROOM_SUCCESS;
  payload: Room;
}

export interface CreateRoomError extends Action {
  type: typeof CREATE_ROOM_ERROR;
  payload: RoomError;
}

export interface GetRoomsStart extends Action {
  type: typeof GET_ROOMS_START;
  payload: string;
}

export interface GetRoomsSuccess extends Action {
  type: typeof GET_ROOMS_SUCCESS;
  payload: Room[];
}

export interface GetRoomsError extends Action {
  type: typeof GET_ROOMS_ERROR;
  payload: RoomError;
}

export interface GetRoomStart extends Action {
  type: typeof GET_ROOM_START;
  payload: string;
}

export interface GetRoomSuccess extends Action {
  type: typeof GET_ROOM_SUCCESS;
  payload: Room;
}

export interface GetRoomError extends Action {
  type: typeof GET_ROOM_ERROR;
  payload: RoomError;
}

export interface SetCurrentRoomStart extends Action {
  type: typeof SET_CURRENT_ROOM_START,
  payload: Room,
}

export interface SetCurrentRoomSuccess extends Action {
  type: typeof SET_CURRENT_ROOM_SUCCESS,
  payload: Room,
}

export interface SetCurrentRoomError extends Action {
  type: typeof SET_CURRENT_ROOM_ERROR,
  payload: RoomError,
}

export interface SetUnreadMessages extends Action {
  type: typeof SET_UNREAD_MESSAGES,
  payload: Room[],
}

export type RoomAction =
  | CreateRoomStart
  | CreateRoomSuccess
  | CreateRoomError
  | GetRoomsStart
  | GetRoomsSuccess
  | GetRoomsError
  | GetRoomStart
  | GetRoomSuccess
  | GetRoomError
  | SetCurrentRoomStart
  | SetCurrentRoomSuccess
  | SetCurrentRoomError
  | SetUnreadMessages
  | ResetAction;

export interface RoomState {
  rooms: Room[];
  currentRoom: Room | null;
  error: RoomError | null;
}

export interface RoomError {
  status: number;
  message: string;
}

export interface Room {
  _id?: string;
  name: string;
  users: User[];
  messages: any[];
  type?: 'room' | 'dm';
  hasUnreadMessages?: boolean,
}
