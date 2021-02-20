import axios from 'axios';
import { Credentials, SignUpCredentials } from '../redux/auth/auth.types';

interface TokenResponse {
  token: string;
}

export async function signInRequest(
  credentials: Credentials
): Promise<TokenResponse> {
  return await axios.post('/api/auth/login', credentials);
}

export async function signOutRequest(): Promise<void> {
  return await axios.post('/api/auth/logout');
}

export async function signUpRequest(
  signUpCredentials: SignUpCredentials
): Promise<TokenResponse> {
  return await axios.post('/api/auth/register', signUpCredentials);
}
