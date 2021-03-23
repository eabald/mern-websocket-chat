// External
import axios, { AxiosResponse } from 'axios';
// Types
import { UpdateUser, User } from '../redux/user/user.types';

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

export async function updateUserRequest(updateUser: UpdateUser): Promise<UserResponse> {
  const response = await axios.put(`/api/user/update`, updateUser, {
    withCredentials: true,
  });
  return response.data;
}

export async function findUsersRequest(query: string): Promise<UsersResponse> {
  const response = await axios.post(`/api/user/find`, { query }, {
    withCredentials: true,
  });
  return response.data;
}

export async function updateUnreadRequest(roomId: string): Promise<AxiosResponse> {
  const response = await axios.post(`/api/user/update-unread/${roomId}`, {}, {
    withCredentials: true,
  });
  return response.data;
}

export async function blockUserRequest(userId: string): Promise<AxiosResponse> {
  const response = await axios.post(`/api/user/block/${userId}`, {}, {
    withCredentials: true,
  });
  return response.data;
}
