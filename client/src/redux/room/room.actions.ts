import {
  CREATE_ROOM_ERROR,
  CREATE_ROOM_START,
  CREATE_ROOM_SUCCESS,
  GET_ROOMS_START,
  GET_ROOMS_SUCCESS,
  GET_ROOMS_ERROR,
  Room,
  RoomError,
} from './room.types';

export const createRoomStart = (room: Room) => ({
  type: CREATE_ROOM_START,
  payload: room,
});

export const createRoomSuccess = (room: Room) => ({
  type: CREATE_ROOM_SUCCESS,
  payload: room,
});

export const createRoomError = (error: RoomError) => ({
  type: CREATE_ROOM_ERROR,
  payload: error,
});

export const getRoomsStart = (id: string) => ({
  type: GET_ROOMS_START,
  payload: id,
});

export const getRoomsSuccess = (rooms: Room[]) => ({
  type: GET_ROOMS_SUCCESS,
  payload: rooms,
});

export const getRoomsError = (error: RoomError) => ({
  type: GET_ROOMS_ERROR,
  payload: error,
});
