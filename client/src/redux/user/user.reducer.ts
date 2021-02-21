import { Reducer } from 'redux';
import { UserState, UserAction, GET_USER_SUCCESS, GET_USER_ERROR, GET_USERS_SUCCESS, GET_USERS_ERROR } from './user.types';

const INITIAL_STATE: UserState = {
  user: null,
  users: [],
  error: null,
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
      }
    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };
    case GET_USERS_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state;
  }
};

export default userReducer;
