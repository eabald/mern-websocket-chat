import axios, { AxiosResponse } from 'axios';
import { Room } from '../redux/room/room.types';

interface RoomResponse extends AxiosResponse {
  room: Room;
}

export async function createRoomRequest(room: Room): Promise<RoomResponse> {
  const response = await axios.post(`/api/room/create`, room, {
    withCredentials: true,
  });
  return response.data;
}
