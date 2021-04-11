// External
import axios, { AxiosResponse } from 'axios';
// Types
import { Credentials, SignUpCredentials } from '../redux/auth/auth.types';
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
  const response: TokenResponse = await axios.post(
    '/api/auth/login',
    credentials,
    { withCredentials: true }
  );
  return response.data;
}

export async function signOutRequest(): Promise<void> {
  return await axios.post('/api/auth/logout', {}, { withCredentials: true });
}

export async function signUpRequest(
  signUpCredentials: SignUpCredentials
): Promise<RegisterResponse> {
  const response: AxiosResponse = await axios.post(
    '/api/auth/register',
    signUpCredentials,
    { withCredentials: true }
  );
  return response.data;
}
