import { Reducer } from 'redux';
import { RESET } from '../root-types';
import {
  RoomAction,
  RoomState,
  CREATE_ROOM_SUCCESS,
  CREATE_ROOM_ERROR,
  GET_ROOMS_SUCCESS,
  GET_ROOMS_ERROR,
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
    case GET_ROOMS_SUCCESS:
      return {
        ...state,
        rooms: action.payload,
      };
    case GET_ROOMS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case RESET:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default roomReducer;
