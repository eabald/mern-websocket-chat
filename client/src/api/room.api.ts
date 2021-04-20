// API
import api from './api';
// External
import { AxiosResponse } from 'axios';
// Types
import { Room } from '../redux/room/room.types';

interface RoomResponse extends AxiosResponse {
  room: Room;
}

interface RoomsResponse extends AxiosResponse {
  rooms: Room[];
}

export async function createRoomRequest(room: Room): Promise<RoomResponse> {
  const response = await api.post(`/room/create`, room, {
    withCredentials: true,
  });
  return response.data;
}

export async function getRoomsRequest(id: string): Promise<RoomsResponse> {
  const response = await api.get(`/room/get-by-user/${id}`, {
    withCredentials: true,
  });
  return response.data;
}

export async function getRoomRequest(id: string): Promise<RoomResponse> {
  const response = await api.get(`/room/get/${id}`, {
    withCredentials: true,
  });
  return response.data;
}
