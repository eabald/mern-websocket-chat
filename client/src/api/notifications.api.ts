import api from './api';

export async function subscribeToPushNotificationsRequest(subscription: PushSubscription): Promise<void> {
  await api.post('/api/notifications/subscribe', subscription, {
    withCredentials: true,
  });
}
