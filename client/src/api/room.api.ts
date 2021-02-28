import axios, { AxiosResponse } from 'axios';
import { Room } from '../redux/room/room.types';

interface RoomResponse extends AxiosResponse {
  room: Room;
}

interface RoomsResponse extends AxiosResponse {
  rooms: Room[];
}

export async function createRoomRequest(room: Room): Promise<RoomResponse> {
  const response = await axios.post(`/api/room/create`, room, {
    withCredentials: true,
  });
  return response.data;
}

export async function getRoomsRequest(id: string): Promise<RoomsResponse> {
  const response = await axios.get(`/api/room/get-by-user/${id}`, {
    withCredentials: true,
  });
  return response.data;
}
