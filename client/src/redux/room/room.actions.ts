// Types
import {
  CREATE_ROOM_ERROR,
  CREATE_ROOM_START,
  CREATE_ROOM_SUCCESS,
  GET_ROOMS_START,
  GET_ROOMS_SUCCESS,
  GET_ROOMS_ERROR,
  GET_ROOM_START,
  GET_ROOM_SUCCESS,
  GET_ROOM_ERROR,
  Room,
  RoomError,
  RoomAction,
  SET_CURRENT_ROOM_START,
  SET_CURRENT_ROOM_SUCCESS,
  SET_CURRENT_ROOM_ERROR,
  SET_UNREAD_MESSAGES,
  ActiveUserMsg,
  SET_ACTIVE_USER,
  UNSET_ACTIVE_USER,
  SET_ACTIVE_USERS,
} from './room.types';

export const createRoomStart = (room: Room): RoomAction => ({
  type: CREATE_ROOM_START,
  payload: room,
});

export const createRoomSuccess = (room: Room): RoomAction => ({
  type: CREATE_ROOM_SUCCESS,
  payload: room,
});

export const createRoomError = (error: RoomError): RoomAction => ({
  type: CREATE_ROOM_ERROR,
  payload: error,
});

export const getRoomsStart = (id: string): RoomAction => ({
  type: GET_ROOMS_START,
  payload: id,
});

export const getRoomsSuccess = (rooms: Room[]): RoomAction => ({
  type: GET_ROOMS_SUCCESS,
  payload: rooms,
});

export const getRoomsError = (error: RoomError): RoomAction => ({
  type: GET_ROOMS_ERROR,
  payload: error,
});

export const getRoomStart = (id: string): RoomAction => ({
  type: GET_ROOM_START,
  payload: id,
});

export const getRoomSuccess = (room: Room): RoomAction => ({
  type: GET_ROOM_SUCCESS,
  payload: room,
});

export const getRoomError = (error: RoomError): RoomAction => ({
  type: GET_ROOM_ERROR,
  payload: error,
});

export const setCurrentRoomStart = (room: Room): RoomAction => ({
  type: SET_CURRENT_ROOM_START,
  payload: room,
});

export const setCurrentRoomSuccess = (room: Room): RoomAction => ({
  type: SET_CURRENT_ROOM_SUCCESS,
  payload: room,
});

export const setCurrentRoomError = (error: RoomError): RoomAction => ({
  type: SET_CURRENT_ROOM_ERROR,
  payload: error,
});

export const setUnreadMessages = (rooms: Room[]): RoomAction => ({
  type: SET_UNREAD_MESSAGES,
  payload: rooms,
});

export const setActiveUser = (activeUserMsg: ActiveUserMsg): RoomAction => ({
  type: SET_ACTIVE_USER,
  payload: activeUserMsg,
});

export const unsetActiveUser = (activeUserMsg: ActiveUserMsg): RoomAction => ({
  type: UNSET_ACTIVE_USER,
  payload: activeUserMsg,
});

export const setActiveUsers = (activeUserMsg: ActiveUserMsg[]): RoomAction => ({
  type: SET_ACTIVE_USERS,
  payload: activeUserMsg,
});
