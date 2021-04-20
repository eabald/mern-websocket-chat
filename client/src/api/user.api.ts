// API
import api from './api';// External
import { AxiosResponse } from 'axios';
// Types
import { UpdateUser, User } from '../redux/user/user.types';

interface UserResponse extends AxiosResponse {
  user: User;
}

interface UsersResponse extends AxiosResponse {
  users: User[];
}

export async function getUserRequest(id: string): Promise<UserResponse> {
  const response = await api.get(`/user/get/${id}`, {
    withCredentials: true,
  });
  return response.data;
}

export async function updateUserRequest(updateUser: UpdateUser): Promise<UserResponse> {
  const response = await api.put(`/user/update`, updateUser, {
    withCredentials: true,
  });
  return response.data;
}

export async function findUsersRequest(query: string): Promise<UsersResponse> {
  const response = await api.post(`/user/find`, { query }, {
    withCredentials: true,
  });
  return response.data;
}

export async function updateUnreadRequest(roomId: string): Promise<AxiosResponse> {
  const response = await api.post(`/user/update-unread/${roomId}`, {}, {
    withCredentials: true,
  });
  return response.data;
}

export async function blockUserRequest(userId: string): Promise<AxiosResponse> {
  const response = await api.post(`/user/block/${userId}`, {}, {
    withCredentials: true,
  });
  return response.data;
}
