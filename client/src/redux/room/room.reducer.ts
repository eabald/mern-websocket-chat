import { Reducer } from 'redux';
import {
  RoomAction,
  RoomState,
  CREATE_ROOM_SUCCESS,
  CREATE_ROOM_ERROR,
} from './room.types';

const INITIAL_STATE: RoomState = {
  rooms: [],
  error: null,
};

const roomReducer: Reducer<RoomState, RoomAction> = (
  state = INITIAL_STATE,
  action: RoomAction
): RoomState => {
  switch (action.type) {
    case CREATE_ROOM_SUCCESS:
      return {
        ...state,
        rooms: [...state.rooms, action.payload],
      };
    case CREATE_ROOM_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default roomReducer;
