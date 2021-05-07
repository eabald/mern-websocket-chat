// External
import { Reducer } from 'redux';
// Types
import {
  UtilsAction,
  UtilsState,
  SET_FLASH_MESSAGE,
  UNSET_FLASH_MESSAGE,
  UPDATE_LOADING,
  UPDATE_MOBILE_MENU,
  RESET,
  SET_NOTIFICATIONS_ASKING_BLOCKED,
  SET_NOTIFICATIONS_WAITING,
  SET_LAST_ASKED_TS,
  SET_FALLBACK_BACKGROUND,
} from './utils.types';

const INITIAL_STATE: UtilsState = {
  loading: false,
  messages: [],
  mobileMenuOpen: false,
  notificationsAskingBlocked: false,
  notificationsWaiting: false,
  fallbackBackground: null,
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
    case SET_NOTIFICATIONS_ASKING_BLOCKED:
      return {
        ...state,
        notificationsAskingBlocked: action.payload,
      }
    case SET_NOTIFICATIONS_WAITING:
      return {
        ...state,
        notificationsWaiting: action.payload,
      }
    case SET_LAST_ASKED_TS:
      return {
        ...state,
        lastAskedTs: action.payload,
      }
    case SET_FALLBACK_BACKGROUND:
      return {
        ...state,
        fallbackBackground: action.payload,
      }
    case RESET:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default utilsReducer;
