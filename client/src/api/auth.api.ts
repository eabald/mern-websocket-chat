import axios, { AxiosResponse } from 'axios';
import { Credentials, SignUpCredentials } from '../redux/auth/auth.types';

interface TokenResponse extends AxiosResponse {
  token: string;
  user: any
}

export async function signInRequest(
  credentials: Credentials
): Promise<TokenResponse> {
  const response: TokenResponse = await axios.post('/api/auth/login', credentials);
  return response.data;
}

export async function signOutRequest(): Promise<void> {
  return await axios.post('/api/auth/logout');
}

export async function signUpRequest(
  signUpCredentials: SignUpCredentials
): Promise<TokenResponse> {
  return await axios.post('/api/auth/register', signUpCredentials);
}
