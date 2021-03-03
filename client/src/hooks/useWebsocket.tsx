import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { RootState } from '../redux/root-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../redux/user/user.types';
import { Room } from '../redux/room/room.types';
import { setCurrentRoomSuccess } from '../redux/room/room.actions';

const SOCKET_SERVER_URL = 'http://localhost:8000';

interface Msg {
  _id?: string,
  content: string,
  user: User,
  room: Room | string,
  timestamp: Date,
}

const useWebsocket = () => {
  const socketRef = useRef<Socket>();
  const token = useSelector((state: RootState) => state.auth.token);
  const currentRoom = useSelector((state: RootState) => state.room.currentRoom);
  const dispatch = useDispatch();

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL, {
      auth: { token },
    });
    socketRef.current.on('messageReceived', (message: Msg) => {
      if (currentRoom && currentRoom._id === message.room) {
        dispatch(setCurrentRoomSuccess({...currentRoom, messages: [...currentRoom.messages, message]}));
      } else {
        //
      }
    });
    return () => {
      socketRef.current?.disconnect();
    };
  }, [token, currentRoom, dispatch]);

  const sendMessage = (msg: Msg) => {
    socketRef.current?.emit('messageSent', msg);
  };

  return { sendMessage };
};

export default useWebsocket;
