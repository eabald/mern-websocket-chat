// External
import { Reducer } from 'redux';
// Types
import { RESET } from '../utils/utils.types';
import {
  RoomAction,
  RoomState,
  CREATE_ROOM_SUCCESS,
  CREATE_ROOM_ERROR,
  GET_ROOMS_SUCCESS,
  GET_ROOMS_ERROR,
  GET_ROOM_SUCCESS,
  GET_ROOM_ERROR,
  SET_CURRENT_ROOM_SUCCESS,
  SET_CURRENT_ROOM_ERROR,
  SET_UNREAD_MESSAGES,
} from './room.types';

const INITIAL_STATE: RoomState = {
  rooms: [],
  currentRoom: null,
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
    case GET_ROOM_SUCCESS:
      return {
        ...state,
        rooms: [...state.rooms, action.payload],
      };
    case GET_ROOM_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case SET_CURRENT_ROOM_SUCCESS:
      return {
        ...state,
        currentRoom: action.payload,
      }
    case SET_CURRENT_ROOM_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    case SET_UNREAD_MESSAGES:
      return {
        ...state,
        rooms: action.payload,
      }
    case RESET:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default roomReducer;
