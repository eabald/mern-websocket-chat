// External
import { Reducer } from 'redux';
// Types
import { RESET } from '../root-types';
import {
  FlashAction,
  FlashState,
  SET_FLASH_MESSAGE,
  UNSET_FLASH_MESSAGE,
  UPDATE_LOADING,
  UPDATE_MOBILE_MENU,
} from './flash.types';

const INITIAL_STATE: FlashState = {
  loading: false,
  messages: [],
  mobileMenuOpen: false,
};

const flashReducer: Reducer<FlashState, FlashAction> = (
  state = INITIAL_STATE,
  action: FlashAction
): FlashState => {
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

export default flashReducer;
