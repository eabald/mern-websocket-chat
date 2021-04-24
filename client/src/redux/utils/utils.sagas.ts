// External
import { takeLatest, all, call } from 'redux-saga/effects';
// Types
import {
  SubscribeToPushNotificationsAction,
  SUBSCRIBE_TO_PUSH_NOTIFICATIONS,
} from './utils.types';
// Api
import { subscribeToPushNotificationsRequest } from '../../api/notifications.api';

export function* subscribeToPushNotifications({
  payload,
}: SubscribeToPushNotificationsAction) {
  try {
    yield subscribeToPushNotificationsRequest(payload);
  } catch (error) {
    console.log(error);
  }
}

export function* onSubscribeToPushNotifications() {
  yield takeLatest(
    SUBSCRIBE_TO_PUSH_NOTIFICATIONS,
    subscribeToPushNotifications
  );
}

export function* utilsSagas() {
  yield all([call(onSubscribeToPushNotifications)]);
}
