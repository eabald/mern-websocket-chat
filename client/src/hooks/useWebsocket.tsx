// React
import { useEffect, useRef } from 'react';
// Socket.io
import { io, Socket } from 'socket.io-client';
// Redux
import { RootState } from '../redux/root-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../redux/user/user.types';
import { Room } from '../redux/room/room.types';
import { getRoomStart, setCurrentRoomSuccess, setUnreadMessages } from '../redux/room/room.actions';

const SOCKET_SERVER_URL = '/';

interface Msg {
  _id?: string;
  content: string;
  user: User;
  timestamp: Date;
}

interface MsgToSend extends Msg {
  room: Room;
}

interface MsgReceived extends Msg {
  room: string;
}

const useWebsocket = () => {
  const socketRef = useRef<Socket>();
  const token = useSelector((state: RootState) => state.auth.token);
  const currentRoom = useSelector((state: RootState) => state.room.currentRoom);
  const rooms = useSelector((state: RootState) => state.room.rooms);
  const dispatch = useDispatch();

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL, {
      auth: { token },
    });
    socketRef.current.on('messageReceived', (message: MsgReceived) => {
      if (currentRoom && currentRoom._id === message.room) {
        dispatch(
          setCurrentRoomSuccess({
            ...currentRoom,
            messages: [...currentRoom.messages, message],
          })
        );
      } else {
        const taggedRooms = rooms.map((room) => {
          if (room._id === message.room) {
            room.hasUnreadMessages = true;
          }
          return room;
        });
        const notNew = !!taggedRooms.filter(room => room.hasUnreadMessages).length
        if (notNew) {
          dispatch(setUnreadMessages(taggedRooms));
        } else {
          dispatch(getRoomStart(message.room));
        }
      }
    });
    return () => {
      socketRef.current?.disconnect();
    };
  }, [token, currentRoom, dispatch, rooms]);

  const sendMessage = (msg: MsgToSend) => {
    socketRef.current?.emit('messageSent', msg);
  };

  return { sendMessage };
};

export default useWebsocket;
