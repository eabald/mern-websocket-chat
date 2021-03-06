// External
import { all, call } from 'redux-saga/effects';
// Sagas
import authSagas from './auth/auth.sagas';
import userSagas from './user/user.sagas';
import roomSagas from './room/room.sagas';
import paymentSagas from './payment/payment.sagas';

export default function* rootSaga() {
  yield all([
    call(authSagas),
    call(userSagas),
    call(roomSagas),
    call(paymentSagas),
  ]);
}
