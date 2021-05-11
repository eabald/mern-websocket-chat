// External
import { Reducer } from 'redux';
// Types
import {
  BUY_INVITATION_CHECK_STATUS_ERROR,
  BUY_INVITATION_CHECK_STATUS_SUCCESS,
  BUY_INVITATION_CREATE_SESSION_ERROR,
  BUY_INVITATION_CREATE_SESSION_SUCCESS,
  CLEAR_PAYMENT_ERROR,
  PaymentAction,
  PaymentState,
  RESUME_PAYMENT_ERROR,
  RESUME_PAYMENT_SUCCESS,
  BUY_ROOMS_CREATE_SESSION_SUCCESS,
  BUY_ROOMS_CREATE_SESSION_ERROR,
  BUY_ROOMS_CHECK_STATUS_SUCCESS,
  BUY_ROOMS_CHECK_STATUS_ERROR,
} from './payment.types';
import { RESET } from '../utils/utils.types';

const INITIAL_STATE: PaymentState = {
  id: null,
  error: null,
};

const paymentReducer: Reducer<PaymentState, PaymentAction> = (
  state = INITIAL_STATE,
  action: PaymentAction
): PaymentState => {
  switch (action.type) {
    case BUY_INVITATION_CREATE_SESSION_SUCCESS:
      return {
        ...state,
        id: action.payload,
      };
    case BUY_INVITATION_CREATE_SESSION_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case BUY_INVITATION_CHECK_STATUS_SUCCESS:
      return {
        ...state,
        error: null,
        id: null,
      };
    case BUY_INVITATION_CHECK_STATUS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case BUY_ROOMS_CREATE_SESSION_SUCCESS:
      return {
        ...state,
        id: action.payload,
      };
    case BUY_ROOMS_CREATE_SESSION_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case BUY_ROOMS_CHECK_STATUS_SUCCESS:
      return {
        ...state,
        error: null,
        id: null,
      };
    case BUY_ROOMS_CHECK_STATUS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case RESUME_PAYMENT_SUCCESS:
      return {
        ...state,
      };
    case RESUME_PAYMENT_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_PAYMENT_ERROR:
      return {
        ...state,
        error: null,
      };
    case RESET:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default paymentReducer;
