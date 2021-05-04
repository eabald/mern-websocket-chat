// Types
import {
  BUY_INVITATION_CHECK_STATUS_START,
  BUY_INVITATION_CHECK_STATUS_SUCCESS,
  BUY_INVITATION_CREATE_SESSION_ERROR,
  BUY_INVITATION_CREATE_SESSION_START,
  BUY_INVITATION_CREATE_SESSION_SUCCESS,
  BUY_INVITATION_CHECK_STATUS_ERROR,
  PaymentAction,
  PaymentError,
  CLEAR_PAYMENT_ERROR,
  PaymentStatus,
} from './payment.types';

export const buyInvitationCreateSessionStart = (): PaymentAction => ({
  type: BUY_INVITATION_CREATE_SESSION_START,
});

export const buyInvitationCreateSessionSuccess = (id: string): PaymentAction => ({
  type: BUY_INVITATION_CREATE_SESSION_SUCCESS,
  payload: id,
});

export const buyInvitationCreateSessionError = (error: PaymentError): PaymentAction => ({
  type: BUY_INVITATION_CREATE_SESSION_ERROR,
  payload: error,
})

export const buyInvitationsCheckStatusStart = (id: string): PaymentAction => ({
  type: BUY_INVITATION_CHECK_STATUS_START,
  payload: id,
})

export const buyInvitationsCheckStatusSuccess = (status: PaymentStatus): PaymentAction => ({
  type: BUY_INVITATION_CHECK_STATUS_SUCCESS,
  payload: status,
})

export const buyInvitationsCheckStatusError = (error: PaymentError): PaymentAction => ({
  type: BUY_INVITATION_CHECK_STATUS_ERROR,
  payload: error,
})

export const clearPaymentError = () => ({
  type: CLEAR_PAYMENT_ERROR,
})
