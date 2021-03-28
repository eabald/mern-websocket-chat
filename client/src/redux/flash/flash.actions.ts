import {
  FlashAction,
  FlashMessage,
  UPDATE_LOADING,
  SET_FLASH_MESSAGE,
  UNSET_FLASH_MESSAGE,
  UPDATE_MOBILE_MENU,
} from './flash.types';

export const updateLoading = (isLoading: boolean): FlashAction => ({
  type: UPDATE_LOADING,
  payload: isLoading,
});

export const setFlashMessage = (message: FlashMessage): FlashAction => ({
  type: SET_FLASH_MESSAGE,
  payload: message,
});

export const unsetFlashMessage = (message: FlashMessage): FlashAction => ({
  type: UNSET_FLASH_MESSAGE,
  payload: message,
});

export const updateMobileMenu = (isOpen: boolean): FlashAction => ({
  type: UPDATE_MOBILE_MENU,
  payload: isOpen,
})
