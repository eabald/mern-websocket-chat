// External
import { takeLatest, put, all, call } from 'redux-saga/effects';
import { loadStripe, Stripe } from '@stripe/stripe-js';
// Types
import {
  BuyInvitationCheckStatusStartAction,
  BuyInvitationCreateSessionStartAction,
  BUY_INVITATION_CHECK_STATUS_START,
  BUY_INVITATION_CREATE_SESSION_START,
  ResumePaymentStartAction,
  RESUME_PAYMENT_START,
  BuyRoomsCheckStatusStartAction,
  BuyRoomsCreateSessionStartAction,
  BUY_ROOMS_CREATE_SESSION_START,
  BUY_ROOMS_CHECK_STATUS_START,
  BuyRegistrationCreateSessionStartAction,
  BUY_REGISTRATION_CREATE_SESSION_START,
  BuyRegistrationCheckStatusStartAction,
  BUY_REGISTRATION_CHECK_STATUS_START,
} from './payment.types';
// Actions
import { setFlashMessage, updateLoading } from '../utils/utils.actions';
import {
  buyInvitationCreateSessionError,
  buyInvitationCreateSessionSuccess,
  buyInvitationsCheckStatusError,
  buyInvitationsCheckStatusSuccess,
  buyRegistrationCheckStatusError,
  buyRegistrationCheckStatusSuccess,
  buyRegistrationCreateSessionError,
  buyRegistrationCreateSessionSuccess,
  buyRoomsCheckStatusError,
  buyRoomsCheckStatusSuccess,
  buyRoomsCreateSessionError,
  buyRoomsCreateSessionSuccess,
  resumePaymentError,
} from './payment.actions';
// Api
import {
  buyInvitationsRequest,
  buyInvitationsStatusRequest,
  buyRegistrationRequest,
  buyRegistrationStatusRequest,
  buyRoomsRequest,
  buyRoomsStatusRequest,
} from '../../api/payment.api';
import { getUserSuccess } from '../user/user.actions';
// Utils
import { checkForUnauthorized } from '../auth/auth.sagas';

const stripePromise = loadStripe(
  process.env.REACT_STRIPE_PUBLIC_KEY ??
    'pk_test_Ex1GhgVc0CtiRPnGeiWCtf1i009JA5bTaj'
);

export function* buyInvitation() {
  try {
    yield put(updateLoading(true));
    const stripe: Stripe = yield stripePromise;
    const { id } = yield buyInvitationsRequest();
    yield put(buyInvitationCreateSessionSuccess(id));
    yield stripe.redirectToCheckout({ sessionId: id });
  } catch (error) {
    yield put(updateLoading(false));
    yield checkForUnauthorized(error.response.data);
    let errorMsg;
    if (error.message) {
      errorMsg = {
        status: 'error',
        message: error.message,
      };
    } else {
      errorMsg = error.response.data;
    }
    yield put(buyInvitationCreateSessionError(errorMsg));
  }
}

export function* buyInvitationsCheckStatus({
  payload,
}: BuyInvitationCheckStatusStartAction) {
  try {
    yield put(updateLoading(true));
    const { status, message, user } = yield buyInvitationsStatusRequest(
      payload
    );
    yield put(getUserSuccess(user));
    yield put(buyInvitationsCheckStatusSuccess({ status, message }));
    yield put(setFlashMessage({ status, message }));
    yield put(updateLoading(false));
  } catch (error) {
    yield put(updateLoading(false));
    yield checkForUnauthorized(error.response.data);
    yield put(buyInvitationsCheckStatusError(error.response.data));
  }
}

export function* buyRooms() {
  try {
    yield put(updateLoading(true));
    const stripe: Stripe = yield stripePromise;
    const { id } = yield buyRoomsRequest();
    yield put(buyRoomsCreateSessionSuccess(id));
    yield stripe.redirectToCheckout({ sessionId: id });
  } catch (error) {
    yield put(updateLoading(false));
    yield checkForUnauthorized(error.response.data);
    let errorMsg;
    if (error.message) {
      errorMsg = {
        status: 'error',
        message: error.message,
      };
    } else {
      errorMsg = error.response.data;
    }
    yield put(buyRoomsCreateSessionError(errorMsg));
  }
}

export function* buyRoomsCheckStatus({
  payload,
}: BuyRoomsCheckStatusStartAction) {
  try {
    yield put(updateLoading(true));
    const { status, message, user } = yield buyRoomsStatusRequest(
      payload
    );
    yield put(getUserSuccess(user));
    yield put(buyRoomsCheckStatusSuccess({ status, message }));
    yield put(setFlashMessage({ status, message }));
    yield put(updateLoading(false));
  } catch (error) {
    yield put(updateLoading(false));
    yield checkForUnauthorized(error.response.data);
    yield put(buyRoomsCheckStatusError(error.response.data));
  }
}

export function* resumePayment({ payload }: ResumePaymentStartAction) {
  try {
    yield put(updateLoading(true));
    const stripe: Stripe = yield stripePromise;
    yield stripe.redirectToCheckout({ sessionId: payload });
  } catch (error) {
    yield put(updateLoading(false));
    let errorMsg;
    if (error.message) {
      errorMsg = {
        status: 'error',
        message: error.message,
      };
    } else {
      errorMsg = error.response.data;
    }
    yield put(resumePaymentError(errorMsg));
  }
}

export function* buyRegistration({ payload }: BuyRegistrationCreateSessionStartAction) {
  try {
    yield put(updateLoading(true));
    const stripe: Stripe = yield stripePromise;
    const { id } = yield buyRegistrationRequest(payload);
    yield put(buyRegistrationCreateSessionSuccess(id));
    yield stripe.redirectToCheckout({ sessionId: id });
  } catch (error) {
    yield put(updateLoading(false));
    let errorMsg;
    if (error.message) {
      errorMsg = {
        status: 'error',
        message: error.message,
      };
    } else {
      errorMsg = error.response.data;
    }
    yield put(buyRegistrationCreateSessionError(errorMsg));
  }
}

export function* buyRegistrationCheckStatus({ payload }: BuyRegistrationCheckStatusStartAction) {
  try {
    yield put(updateLoading(true));
    const { status, message } = yield buyRegistrationStatusRequest(
      payload
    );
    yield put(buyRegistrationCheckStatusSuccess({ status, message }));
    yield put(setFlashMessage({ status, message }));
    yield put(updateLoading(false));
  } catch (error) {
    yield put(updateLoading(false));
    yield put(buyRegistrationCheckStatusError(error.response.data));
  }
}

export function* onBuyInvitationsStart() {
  yield takeLatest<BuyInvitationCreateSessionStartAction>(
    BUY_INVITATION_CREATE_SESSION_START,
    buyInvitation
  );
}

export function* onBuyInvitationsCheckStatusStart() {
  yield takeLatest<BuyInvitationCheckStatusStartAction>(
    BUY_INVITATION_CHECK_STATUS_START,
    buyInvitationsCheckStatus
  );
}

export function* onBuyRoomsStart() {
  yield takeLatest<BuyRoomsCreateSessionStartAction>(
    BUY_ROOMS_CREATE_SESSION_START,
    buyRooms
  );
}

export function* onBuyRoomsCheckStatusStart() {
  yield takeLatest<BuyRoomsCheckStatusStartAction>(
    BUY_ROOMS_CHECK_STATUS_START,
    buyRoomsCheckStatus
  );
}

export function* onResumePaymentStart() {
  yield takeLatest<ResumePaymentStartAction>(
    RESUME_PAYMENT_START,
    resumePayment
  );
}

export function* onBuyRegistrationStart() {
  yield takeLatest<BuyRegistrationCreateSessionStartAction>(
    BUY_REGISTRATION_CREATE_SESSION_START,
    buyRegistration
  )
}

export function* onBuyRegistrationCheckStatusStart() {
  yield takeLatest<BuyRegistrationCheckStatusStartAction>(
    BUY_REGISTRATION_CHECK_STATUS_START,
    buyRegistrationCheckStatus
  )
}

export function* paymentSagas() {
  yield all([
    call(onBuyInvitationsStart),
    call(onBuyInvitationsCheckStatusStart),
    call(onBuyRoomsStart),
    call(onBuyRoomsCheckStatusStart),
    call(onResumePaymentStart),
    call(onBuyRegistrationStart),
    call(onBuyRegistrationCheckStatusStart),
  ]);
}

export default paymentSagas;
