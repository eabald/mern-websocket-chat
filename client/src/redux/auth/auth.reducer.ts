import { Reducer } from 'redux';
import {
  AuthState,
  AuthAction,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_ERROR,
} from './auth.types';

const INITIAL_STATE: AuthState = {
  token: null,
  error: null,
};

const authReducer: Reducer<AuthState, AuthAction> = (
  state = INITIAL_STATE,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        token: action.payload,
        error: null,
      };
    case SIGN_IN_ERROR:
      return {
        ...state,
        token: null,
        error: action.payload,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        token: action.payload,
        error: null,
      };
    case SIGN_UP_ERROR:
      return {
        ...state,
        token: null,
        error: action.payload,
      };
    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        token: null,
        error: null,
      };
    case SIGN_OUT_ERROR:
      return {
        ...state,
        token: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
