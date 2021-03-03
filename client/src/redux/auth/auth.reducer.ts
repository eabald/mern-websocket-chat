// External
import { Reducer } from 'redux';
// Types
import { RESET } from '../root-types';
import {
  AuthState,
  AuthAction,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_ERROR,
  CLEAR_AUTH_ERROR,
} from './auth.types';

const INITIAL_STATE: AuthState = {
  token: null,
  error: null,
  refreshToken: null,
};

const authReducer: Reducer<AuthState, AuthAction> = (
  state = INITIAL_STATE,
  action: AuthAction
) : AuthState => {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        error: null,
      };
    case SIGN_IN_ERROR:
      return {
        ...state,
        token: null,
        refreshToken: null,
        error: action.payload,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        error: null,
      };
    case SIGN_UP_ERROR:
      return {
        ...state,
        token: null,
        refreshToken: null,
        error: action.payload,
      };
    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        token: null,
        refreshToken: null,
        error: null,
      };
    case SIGN_OUT_ERROR:
      return {
        ...state,
        token: null,
        refreshToken: null,
        error: action.payload,
      };
    case CLEAR_AUTH_ERROR:
      return {
        ...state,
        error: null,
      };
    case RESET:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default authReducer;
