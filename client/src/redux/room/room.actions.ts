import { CREATE_ROOM_ERROR, CREATE_ROOM_START, CREATE_ROOM_SUCCESS, Room, RoomError } from './room.types'

export const createRoomStart = (room: Room) => ({
  type: CREATE_ROOM_START,
  payload: room,
})

export const createRoomSuccess = (room: Room) => ({
  type: CREATE_ROOM_SUCCESS,
  payload: room,
})

export const createRoomError = (error: RoomError) => ({
  type: CREATE_ROOM_ERROR,
  payload: error,
})
