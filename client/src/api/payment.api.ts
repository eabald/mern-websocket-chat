// API
import api from './api';
// External
import { AxiosResponse } from 'axios';
// Types
import { User } from '../redux/user/user.types';

interface PaymentResponse extends AxiosResponse {
  id: string;
}

export async function buyInvitationsRequest(): Promise<PaymentResponse> {
  const response = await api.post(
    '/payment/buy-invitations',
    {},
    { withCredentials: true }
  );
  return response.data;
}

export async function buyInvitationsStatusRequest(id: string): Promise<User> {
  const response = await api.post(
    '/payment/buy-invitations-status',
    { id },
    { withCredentials: true }
  );
  return response.data;
}

export async function buyRoomsRequest(): Promise<PaymentResponse> {
  const response = await api.post(
    '/payment/buy-rooms',
    {},
    { withCredentials: true }
  );
  return response.data;
}

export async function buyRoomsStatusRequest(id: string): Promise<User> {
  const response = await api.post(
    '/payment/buy-rooms-status',
    { id },
    { withCredentials: true }
  );
  return response.data;
}
