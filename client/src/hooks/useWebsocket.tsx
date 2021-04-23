// React
import { useCallback, useEffect, useRef } from 'react';
// Socket.io
import { io, Socket } from 'socket.io-client';
// Redux
import { RootState } from '../redux/root-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../redux/user/user.types';
import { Room } from '../redux/room/room.types';
import {
  getRoomStart,
  setCurrentRoomSuccess,
  setUnreadMessages,
} from '../redux/room/room.actions';
import { updateUnread } from '../redux/user/user.actions';
import { FlashMessage } from '../redux/utils/utils.types';
import { setFlashMessage } from '../redux/utils/utils.actions';
import { useTranslation } from 'react-i18next';

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
  const currentRoom = useSelector((state: RootState) => state.room.currentRoom);
  const currenUser = useSelector((state: RootState) => state.user.user);
  const rooms = useSelector((state: RootState) => state.room.rooms);
  const unread = useSelector((state: RootState) => state.user.unread);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL);
    socketRef.current.on('messageReceived', (message: MsgReceived) => {
      if (currentRoom && currentRoom._id === message.room) {
        dispatch(
          setCurrentRoomSuccess({
            ...currentRoom,
            messages: [...currentRoom.messages, message],
          })
        );
      } else {
        dispatch(updateUnread(message.room));
        const isNewRoom = !rooms.find((room) => room._id === message.room);
        if (isNewRoom) {
          dispatch(getRoomStart(message.room));
        }
      }
    });
    socketRef.current.on('messageBlocked', (statusData: FlashMessage) => {
      dispatch(setFlashMessage(statusData));
    });
    return () => {
      socketRef.current?.disconnect();
    };
  });

  const newMessageNotification = useCallback(
    (user: string) => {
      if (!document.hasFocus()) {
        return new Notification(t('New message'), {
          body: t('New message from {{user}}', { user }),
          requireInteraction: true,
          vibrate: [200, 100, 200],
        });
      }
    },
    [t]
  );

  useEffect(() => {
    let changed = false;
    const taggedRooms = rooms.map((room) => {
      const currentUnread = room.hasUnreadMessages;
      if (room._id && unread.includes(room._id)) {
        room.hasUnreadMessages = true;
      } else {
        room.hasUnreadMessages = false;
      }
      changed = currentUnread !== room.hasUnreadMessages;
      return room;
    });
    if (changed) {
      dispatch(setUnreadMessages(taggedRooms));
      if ('Notification' in window && Notification.permission === 'granted') {
        const lastUnreadId = unread[unread.length - 1];
        let messages = rooms.find((room) => room._id === lastUnreadId)
          ?.messages;
        messages = messages?.filter(
          (message) => message.user._id !== currenUser?._id
        );
        const lastMessage = messages?.length
          ? messages[messages?.length - 1]
          : '';
        if (lastMessage) {
          newMessageNotification(lastMessage.user.username);
        }
      }
    }
  }, [unread, rooms, dispatch, newMessageNotification, currenUser]);

  const sendMessage = (msg: MsgToSend) => {
    socketRef.current?.emit('messageSent', msg);
  };

  return { sendMessage };
};

export default useWebsocket;
