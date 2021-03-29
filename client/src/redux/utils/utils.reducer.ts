// External
import { Reducer } from 'redux';
// Types
import { RESET } from '../root-types';
import {
  UtilsAction,
  UtilsState,
  SET_FLASH_MESSAGE,
  UNSET_FLASH_MESSAGE,
  UPDATE_LOADING,
  UPDATE_MOBILE_MENU,
} from './utils.types';

const INITIAL_STATE: UtilsState = {
  loading: false,
  messages: [],
  mobileMenuOpen: false,
};

const utilsReducer: Reducer<UtilsState, UtilsAction> = (
  state = INITIAL_STATE,
  action: UtilsAction
): UtilsState => {
  switch (action.type) {
    case UPDATE_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_FLASH_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case UNSET_FLASH_MESSAGE:
      return {
        ...state,
        messages: state.messages.filter(
          (message) =>
            message.status !== action.payload.status &&
            message.message !== action.payload.message
        ),
      };
    case UPDATE_MOBILE_MENU:
      return {
        ...state,
        mobileMenuOpen: action.payload,
      }
    case RESET:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default utilsReducer;
