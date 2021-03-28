// External
import { Action } from 'redux';
// Types
import { ResetAction } from '../root-types';

export const UPDATE_LOADING = 'UPDATE_LOADING';

export const SET_FLASH_MESSAGE = 'SET_FLASH_MESSAGE';

export const UNSET_FLASH_MESSAGE = 'UNSET_FLASH_MESSAGE';

export const UPDATE_MOBILE_MENU = 'UPDATE_MOBILE_MENU';

export interface UpdateLoadingAction extends Action {
  type: typeof UPDATE_LOADING;
  payload: boolean;
}

export interface SetFlashMessageAction extends Action {
  type: typeof SET_FLASH_MESSAGE;
  payload: FlashMessage;
}

export interface UnsetFlashMessageAction extends Action {
  type: typeof UNSET_FLASH_MESSAGE;
  payload: FlashMessage;
}

export interface UpdateMobileMenuAction extends Action {
  type: typeof UPDATE_MOBILE_MENU;
  payload: boolean;
}

export type FlashAction =
  | UpdateLoadingAction
  | SetFlashMessageAction
  | UnsetFlashMessageAction
  | UpdateMobileMenuAction
  | ResetAction;

export interface FlashMessage {
  status: string;
  message: string;
}

export interface FlashState {
  loading: boolean;
  messages: FlashMessage[];
  mobileMenuOpen: boolean;
}
