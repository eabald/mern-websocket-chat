// External
import { Action } from 'redux';
// Types
import { ResetAction /*, FlashMessage*/ } from '../utils/utils.types';

export const BUY_INVITATION_CREATE_SESSION_START =
  'BUY_INVITATION_CREATE_SESSION_START';
export const BUY_INVITATION_CREATE_SESSION_SUCCESS =
  'BUY_INVITATION_CREATE_SESSION_SUCCESS';
export const BUY_INVITATION_CREATE_SESSION_ERROR =
  'BUY_INVITATION_CREATE_SESSION_ERROR';

export const BUY_INVITATION_CHECK_STATUS_START =
  'BUY_INVITATION_CHECK_STATUS_START';
export const BUY_INVITATION_CHECK_STATUS_SUCCESS =
  'BUY_INVITATION_CHECK_STATUS_SUCCESS';
export const BUY_INVITATION_CHECK_STATUS_ERROR = 'BUY_INVITATION_CREATE_ERROR';

export const CLEAR_PAYMENT_ERROR = 'CLEAR_PAYMENT_ERROR';

export interface BuyInvitationCreateSessionStartAction extends Action {
  type: typeof BUY_INVITATION_CREATE_SESSION_START;
}

export interface BuyInvitationCreateSessionSuccessAction extends Action {
  type: typeof BUY_INVITATION_CREATE_SESSION_SUCCESS;
  payload: string;
}

export interface BuyInvitationCreateSessionErrorAction extends Action {
  type: typeof BUY_INVITATION_CREATE_SESSION_ERROR;
  payload: PaymentError;
}

export interface BuyInvitationCheckStatusStartAction extends Action {
  type: typeof BUY_INVITATION_CHECK_STATUS_START;
  payload: string;
}

export interface BuyInvitationCheckStatusSuccessAction extends Action {
  type: typeof BUY_INVITATION_CHECK_STATUS_SUCCESS;
  payload: PaymentStatus;
}

export interface BuyInvitationCheckStatusErrorAction extends Action {
  type: typeof BUY_INVITATION_CHECK_STATUS_ERROR;
  payload: PaymentError;
}

export interface ClearPaymentErrorAction extends Action {
  type: typeof CLEAR_PAYMENT_ERROR;
}

export type PaymentAction =
  | BuyInvitationCreateSessionStartAction
  | BuyInvitationCreateSessionSuccessAction
  | BuyInvitationCreateSessionErrorAction
  | BuyInvitationCheckStatusStartAction
  | BuyInvitationCheckStatusSuccessAction
  | BuyInvitationCheckStatusErrorAction
  | ClearPaymentErrorAction
  | ResetAction;

export interface PaymentState {
  id: string | null;
  error: PaymentError | null;
}

export interface PaymentError {
  status: number;
  message: string;
}

export interface PaymentStatus {
  status: string;
  message: string;
}
