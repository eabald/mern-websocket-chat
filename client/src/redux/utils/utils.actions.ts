import {
  UtilsAction,
  FlashMessage,
  UPDATE_LOADING,
  SET_FLASH_MESSAGE,
  UNSET_FLASH_MESSAGE,
  UPDATE_MOBILE_MENU,
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
