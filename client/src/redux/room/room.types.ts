import { Action } from 'redux';
import { User } from '../user/user.types'

export const CREATE_ROOM_START = 'CREATE_ROOM_START';
export const CREATE_ROOM_SUCCESS = 'CREATE_ROOM_SUCCESS';
export const CREATE_ROOM_ERROR = 'CREATE_ROOM_ERROR';

export interface CreateRoomStart extends Action {
  type: typeof CREATE_ROOM_START,
  payload: Room,
}

export interface CreateRoomSuccess extends Action {
  type: typeof CREATE_ROOM_SUCCESS,
  payload: Room,
}

export interface CreateRoomError extends Action {
  type: typeof CREATE_ROOM_ERROR,
  payload: RoomError,
}

export type RoomAction = CreateRoomStart
| CreateRoomSuccess
| CreateRoomError;

export interface RoomState {
  rooms: Room[] | [];
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
