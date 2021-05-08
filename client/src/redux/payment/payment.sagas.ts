// External
import { takeLatest, put, all, call } from 'redux-saga/effects';
import { loadStripe, Stripe } from '@stripe/stripe-js';
// Types
import { BuyInvitationCheckStatusStartAction, BuyInvitationCreateSessionStartAction, BUY_INVITATION_CHECK_STATUS_START, BUY_INVITATION_CREATE_SESSION_START, ResumePaymentStartAction, RESUME_PAYMENT_START } from './payment.types';
// Actions
import { setFlashMessage, updateLoading } from '../utils/utils.actions';
import { buyInvitationCreateSessionError, buyInvitationCreateSessionSuccess, buyInvitationsCheckStatusError, buyInvitationsCheckStatusSuccess, resumePaymentError } from './payment.actions';
// Api
import { buyInvitationsRequest, buyInvitationsStatusRequest } from '../../api/payment.api'
import { getUserSuccess } from '../user/user.actions';
// Utils
import { checkForUnauthorized } from '../auth/auth.sagas';


const stripePromise = loadStripe(process.env.REACT_STRIPE_PUBLIC_KEY ?? 'pk_test_Ex1GhgVc0CtiRPnGeiWCtf1i009JA5bTaj');

export function* buyInvitation() {
  try {
    yield put(updateLoading(true));
    const stripe: Stripe = yield stripePromise;
    const { id } = yield buyInvitationsRequest();
    yield put(buyInvitationCreateSessionSuccess(id));
    yield stripe.redirectToCheckout({ sessionId: id })
  } catch (error) {
    yield put(updateLoading(false));
    yield checkForUnauthorized(error.response.data);
    let errorMsg;
    if (error.message) {
      errorMsg = {
        status: 'error',
        message: error.message,
       }
      } else {
        errorMsg = error.response.data
      }
    yield put(buyInvitationCreateSessionError(errorMsg));
  }
}

export function* buyInvitationsCheckStatus({ payload }: BuyInvitationCheckStatusStartAction) {
  try {
    yield put(updateLoading(true));
    const { status, message, user } = yield buyInvitationsStatusRequest(payload);
    yield put(getUserSuccess(user));
    yield put(buyInvitationsCheckStatusSuccess({ status, message }))
    yield put(setFlashMessage({ status, message }));
    yield put(updateLoading(false));
  } catch (error) {
    yield put(updateLoading(false));
    yield checkForUnauthorized(error.response.data);
    yield put(buyInvitationsCheckStatusError(error.response.data));
  }
}

export function* resumePayment({ payload }: ResumePaymentStartAction) {
  try {
    yield put(updateLoading(true));
    const stripe: Stripe = yield stripePromise;
    yield stripe.redirectToCheckout({ sessionId: payload })
  } catch (error) {
    yield put(updateLoading(false));
    let errorMsg;
    if (error.message) {
      errorMsg = {
        status: 'error',
        message: error.message,
       }
      } else {
        errorMsg = error.response.data
      }
    yield put(resumePaymentError(errorMsg));
  }
}

export function* onBuyInvitationsStart() {
  yield takeLatest<BuyInvitationCreateSessionStartAction>(BUY_INVITATION_CREATE_SESSION_START, buyInvitation);
}

export function* onBuyInvitationsCheckStatusStart() {
  yield takeLatest<BuyInvitationCheckStatusStartAction>(BUY_INVITATION_CHECK_STATUS_START, buyInvitationsCheckStatus);
}

export function* onResumePaymentStart() {
  yield takeLatest<ResumePaymentStartAction>(RESUME_PAYMENT_START, resumePayment);
}

export function* paymentSagas() {
  yield all([call(onBuyInvitationsStart), call(onBuyInvitationsCheckStatusStart), call(onResumePaymentStart)]);
}

export default paymentSagas;
