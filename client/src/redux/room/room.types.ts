import { Action } from 'redux';
import { User } from '../user/user.types';

export const CREATE_ROOM_START = 'CREATE_ROOM_START';
export const CREATE_ROOM_SUCCESS = 'CREATE_ROOM_SUCCESS';
export const CREATE_ROOM_ERROR = 'CREATE_ROOM_ERROR';

export const GET_ROOMS_START = 'GET_ROOMS_START';
export const GET_ROOMS_SUCCESS = 'GET_ROOMS_SUCCESS';
export const GET_ROOMS_ERROR = 'GET_ROOMS_ERROR';

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

export type RoomAction =
  | CreateRoomStart
  | CreateRoomSuccess
  | CreateRoomError
  | GetRoomsStart
  | GetRoomsSuccess
  | GetRoomsError;

export interface RoomState {
  rooms: Room[];
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
}
