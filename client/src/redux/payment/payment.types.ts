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

export const BUY_ROOMS_CREATE_SESSION_START = 'BUY_ROOMS_CREATE_SESSION_START';
export const BUY_ROOMS_CREATE_SESSION_SUCCESS =
  'BUY_ROOMS_CREATE_SESSION_SUCCESS';
export const BUY_ROOMS_CREATE_SESSION_ERROR = 'BUY_ROOMS_CREATE_SESSION_ERROR';

export const BUY_ROOMS_CHECK_STATUS_START = 'BUY_ROOMS_CHECK_STATUS_START';
export const BUY_ROOMS_CHECK_STATUS_SUCCESS = 'BUY_ROOMS_CHECK_STATUS_SUCCESS';
export const BUY_ROOMS_CHECK_STATUS_ERROR = 'BUY_ROOMS_CREATE_ERROR';

export const RESUME_PAYMENT_START = 'RESUME_PAYMENT_START';
export const RESUME_PAYMENT_SUCCESS = 'RESUME_PAYMENT_SUCCESS';
export const RESUME_PAYMENT_ERROR = 'RESUME_PAYMENT_ERROR';

export const BUY_REGISTRATION_CREATE_SESSION_START = 'BUY_REGISTRATION_CREATE_SESSION_START';
export const BUY_REGISTRATION_CREATE_SESSION_SUCCESS = 'BUY_REGISTRATION_CREATE_SESSION_SUCCESS';
export const BUY_REGISTRATION_CREATE_SESSION_ERROR = 'BUY_REGISTRATION_CREATE_SESSION_ERROR';

export const BUY_REGISTRATION_CHECK_STATUS_START = 'BUY_REGISTRATION_CHECK_STATUS_START';
export const BUY_REGISTRATION_CHECK_STATUS_SUCCESS = 'BUY_REGISTRATION_CHECK_STATUS_SUCCESS';
export const BUY_REGISTRATION_CHECK_STATUS_ERROR = 'BUY_REGISTRATION_CHECK_STATUS_ERROR';

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
export interface BuyRoomsCreateSessionStartAction extends Action {
  type: typeof BUY_ROOMS_CREATE_SESSION_START;
}

export interface BuyRoomsCreateSessionSuccessAction extends Action {
  type: typeof BUY_ROOMS_CREATE_SESSION_SUCCESS;
  payload: string;
}

export interface BuyRoomsCreateSessionErrorAction extends Action {
  type: typeof BUY_ROOMS_CREATE_SESSION_ERROR;
  payload: PaymentError;
}

export interface BuyRoomsCheckStatusStartAction extends Action {
  type: typeof BUY_ROOMS_CHECK_STATUS_START;
  payload: string;
}

export interface BuyRoomsCheckStatusSuccessAction extends Action {
  type: typeof BUY_ROOMS_CHECK_STATUS_SUCCESS;
  payload: PaymentStatus;
}

export interface BuyRoomsCheckStatusErrorAction extends Action {
  type: typeof BUY_ROOMS_CHECK_STATUS_ERROR;
  payload: PaymentError;
}

export interface ClearPaymentErrorAction extends Action {
  type: typeof CLEAR_PAYMENT_ERROR;
}

export interface ResumePaymentStartAction extends Action {
  type: typeof RESUME_PAYMENT_START;
  payload: string;
}

export interface ResumePaymentSuccessAction extends Action {
  type: typeof RESUME_PAYMENT_SUCCESS;
}

export interface ResumePaymentErrorAction extends Action {
  type: typeof RESUME_PAYMENT_ERROR;
  payload: PaymentError;
}

export interface BuyRegistrationCreateSessionStartAction extends Action {
  type: typeof BUY_REGISTRATION_CREATE_SESSION_START;
  payload: BuyRegistrationCredentials;
}

export interface BuyRegistrationCreateSessionSuccessAction extends Action {
  type: typeof BUY_REGISTRATION_CREATE_SESSION_SUCCESS;
  payload: string;
}

export interface BuyRegistrationCreateSessionErrorAction extends Action {
  type: typeof BUY_REGISTRATION_CREATE_SESSION_ERROR;
  payload: PaymentError;
}

export interface BuyRegistrationCheckStatusStartAction extends Action {
  type: typeof BUY_REGISTRATION_CHECK_STATUS_START;
  payload: string;
}

export interface BuyRegistrationCheckStatusSuccessAction extends Action {
  type: typeof BUY_REGISTRATION_CHECK_STATUS_SUCCESS;
  payload: PaymentStatus;
}

export interface BuyRegistrationCheckStatusErrorAction extends Action {
  type: typeof BUY_REGISTRATION_CHECK_STATUS_ERROR;
  payload: PaymentError;
}

export type PaymentAction =
  | BuyInvitationCreateSessionStartAction
  | BuyInvitationCreateSessionSuccessAction
  | BuyInvitationCreateSessionErrorAction
  | BuyInvitationCheckStatusStartAction
  | BuyInvitationCheckStatusSuccessAction
  | BuyInvitationCheckStatusErrorAction
  | BuyRoomsCreateSessionStartAction
  | BuyRoomsCreateSessionSuccessAction
  | BuyRoomsCreateSessionErrorAction
  | BuyRoomsCheckStatusStartAction
  | BuyRoomsCheckStatusSuccessAction
  | BuyRoomsCheckStatusErrorAction
  | ResumePaymentStartAction
  | ResumePaymentSuccessAction
  | ResumePaymentErrorAction
  | BuyRegistrationCreateSessionStartAction
  | BuyRegistrationCreateSessionSuccessAction
  | BuyRegistrationCreateSessionErrorAction
  | BuyRegistrationCheckStatusStartAction
  | BuyRegistrationCheckStatusSuccessAction
  | BuyRegistrationCheckStatusErrorAction
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

export interface BuyRegistrationCredentials {
  email: string;
  terms: boolean;
}
