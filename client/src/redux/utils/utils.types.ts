// External
import { Action } from 'redux';

export const UPDATE_LOADING = 'UPDATE_LOADING';

export const SET_FLASH_MESSAGE = 'SET_FLASH_MESSAGE';

export const UNSET_FLASH_MESSAGE = 'UNSET_FLASH_MESSAGE';

export const UPDATE_MOBILE_MENU = 'UPDATE_MOBILE_MENU';

export const SET_NOTIFICATIONS_ASKING_BLOCKED = 'SET_NOTIFICATIONS_ASKING_BLOCKED';

export const SET_NOTIFICATIONS_WAITING = 'SET_NOTIFICATIONS_WAITING';

export const SET_FALLBACK_BACKGROUND = 'SET_FALLBACK_BACKGROUND';

export const SET_LAST_ASKED_TS = 'SET_LAST_ASKED_TS';

export const RESET = 'RESET';

export interface ResetAction extends Action {
  type: typeof RESET,
}

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

export interface SetNotificationsAskingBlockedAction extends Action {
  type: typeof SET_NOTIFICATIONS_ASKING_BLOCKED;
  payload: boolean;
}

export interface SetNotificationsWaitingAction extends Action {
  type: typeof SET_NOTIFICATIONS_WAITING;
  payload: boolean;
}

export interface SetFallbackBackgroundAction extends Action {
  type: typeof SET_FALLBACK_BACKGROUND;
  payload: any;
}

export interface SetLastAskedTsAction extends Action {
  type: typeof SET_LAST_ASKED_TS;
  payload: number;
}

export type UtilsAction =
  | UpdateLoadingAction
  | SetFlashMessageAction
  | UnsetFlashMessageAction
  | UpdateMobileMenuAction
  | SetNotificationsAskingBlockedAction
  | SetNotificationsWaitingAction
  | SetLastAskedTsAction
  | SetFallbackBackgroundAction
  | ResetAction;

export interface FlashMessage {
  status: string;
  message: string;
  additionalData?: string;
  callback?: (x: string) => void;
}

export interface UtilsState {
  loading: boolean;
  messages: FlashMessage[];
  mobileMenuOpen: boolean;
  notificationsAskingBlocked: boolean;
  notificationsWaiting: boolean;
  lastAskedTs?: number;
  fallbackBackground: any;
}
