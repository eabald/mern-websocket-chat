// External
import { Reducer } from 'redux';
// Types
import { RESET } from '../utils/utils.types';
import {
  UserState,
  UserAction,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  GET_USER_DETAILS_SUCCESS,
  GET_USER_DETAILS_ERROR,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  UPDATE_UNREAD,
  UPDATE_READ,
  BLOCK_USER_SUCCESS,
  BLOCK_USER_ERROR,
  INVITE_USER_SUCCESS,
  INVITE_USER_ERROR,
  CLEAR_USER_ERROR,
} from './user.types';

const INITIAL_STATE: UserState = {
  user: null,
  users: [],
  error: null,
  unread: [],
};

const userReducer: Reducer<UserState, UserAction> = (
  state = INITIAL_STATE,
  action: UserAction
): UserState => {
  switch (action.type) {
    case GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case GET_USER_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case GET_USER_DETAILS_SUCCESS:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case GET_USER_DETAILS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case UPDATE_USER_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_UNREAD:
      return {
        ...state,
        unread: [...new Set([...state.unread, action.payload])],
      };
    case UPDATE_READ:
      return {
        ...state,
        unread: state.unread.filter(roomId => roomId !== action.payload),
      };
    case BLOCK_USER_SUCCESS:
      return {...state};
    case BLOCK_USER_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    case INVITE_USER_SUCCESS:
      return {...state};
    case INVITE_USER_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    case CLEAR_USER_ERROR:
      return {
        ...state,
        error: null,
      }
    case RESET:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default userReducer;
