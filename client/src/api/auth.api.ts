// API
import api from './api';
// External
import { AxiosResponse } from 'axios';
// Types
import {
  ChangePasswordData,
  Credentials,
  ResetPasswordData,
  SignUpCredentials,
} from '../redux/auth/auth.types';
import { User } from '../redux/user/user.types';

interface TokenResponse extends AxiosResponse {
  token: string;
  user: User;
}

interface RegisterResponse {
  status: string;
  message: string;
}

export async function signInRequest(
  credentials: Credentials
): Promise<TokenResponse> {
  const response: TokenResponse = await api.post(
    '/auth/login',
    credentials,
    { withCredentials: true }
  );
  return response.data;
}

export async function signOutRequest(): Promise<void> {
  return await api.post('/auth/logout', {}, { withCredentials: true });
}

export async function signUpRequest(
  signUpCredentials: SignUpCredentials
): Promise<RegisterResponse> {
  const response: AxiosResponse = await api.post(
    '/auth/register',
    signUpCredentials,
    { withCredentials: true }
  );
  return response.data;
}

export async function verifyEmailRequest(
  token: string
): Promise<RegisterResponse> {
  const response: AxiosResponse = await api.get(`/auth/verify`, {
    params: {
      token,
    },
    withCredentials: true,
  });
  return response.data;
}

export async function resetPasswordRequest(
  resetPasswordData: ResetPasswordData
): Promise<RegisterResponse> {
  const response: AxiosResponse = await api.post(
    `/auth/reset-password`,
    resetPasswordData,
    { withCredentials: true }
  );
  return response.data;
}

export async function changePasswordRequest(
  changePasswordData: ChangePasswordData
): Promise<RegisterResponse> {
  const response: AxiosResponse = await api.post(
    `/auth/change-password`,
    changePasswordData,
    { withCredentials: true }
  );
  return response.data;
}
