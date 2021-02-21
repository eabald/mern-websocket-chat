import axios, { AxiosResponse } from 'axios';
import { User } from '../redux/user/user.types';

interface UserResponse extends AxiosResponse {
  user: User;
}

interface UsersResponse extends AxiosResponse {
  users: User[];
}

export async function getUserRequest(id: string): Promise<UserResponse> {
  const response = await axios.get(`/api/user/get/${id}`, {
    withCredentials: true,
  });
  return response.data;
}

export async function getUsersRequest(): Promise<UsersResponse> {
  const response = await axios.get(`/api/user/get-all`, {
    withCredentials: true,
  });
  return response.data;
}
