import {
  UtilsAction,
  FlashMessage,
  UPDATE_LOADING,
  SET_FLASH_MESSAGE,
  UNSET_FLASH_MESSAGE,
  UPDATE_MOBILE_MENU,
  RESET,
  SET_NOTIFICATIONS_ASKING_BLOCKED,
  SET_NOTIFICATIONS_WAITING,
  SET_LAST_ASKED_TS,
  SET_FALLBACK_BACKGROUND,
} from './utils.types';

export const updateLoading = (isLoading: boolean): UtilsAction => ({
  type: UPDATE_LOADING,
  payload: isLoading,
});

export const setFlashMessage = (message: FlashMessage): UtilsAction => ({
  type: SET_FLASH_MESSAGE,
  payload: message,
});

export const unsetFlashMessage = (message: FlashMessage): UtilsAction => ({
  type: UNSET_FLASH_MESSAGE,
  payload: message,
});

export const updateMobileMenu = (isOpen: boolean): UtilsAction => ({
  type: UPDATE_MOBILE_MENU,
  payload: isOpen,
})

export const setNotificationsAskingBlock = (isBlocked: boolean): UtilsAction => ({
  type: SET_NOTIFICATIONS_ASKING_BLOCKED,
  payload: isBlocked,
})

export const setNotificationsWaiting = (shouldWait: boolean): UtilsAction => ({
  type: SET_NOTIFICATIONS_WAITING,
  payload: shouldWait,
})

export const setFallbackBackground = (background: any): UtilsAction => ({
  type: SET_FALLBACK_BACKGROUND,
  payload: background,
})

export const setLastAskedTs = (timestamp: number): UtilsAction => ({
  type: SET_LAST_ASKED_TS,
  payload: timestamp,
})

export const reset = () => ({
  type: RESET,
});
