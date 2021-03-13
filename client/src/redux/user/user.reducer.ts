// External
import { Reducer } from 'redux';
// Types
import { RESET } from '../root-types';
import {
  UserState,
  UserAction,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  UPDATE_UNREAD,
  UPDATE_READ,
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
    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };
    case GET_USERS_ERROR:
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
      }
    case RESET:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default userReducer;
