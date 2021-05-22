// React
import { useCallback, useEffect } from 'react';
// Socket.io
import { Socket } from 'socket.io-client';
// Redux
import { RootState } from '../redux/root-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../redux/user/user.types';
import { ActiveUserMsg, Room } from '../redux/room/room.types';
import {
  getRoomStart,
  setActiveUser,
  setActiveUsers,
  setCurrentRoomSuccess,
  setUnreadMessages,
  unsetActiveUser,
} from '../redux/room/room.actions';
import { getUserStart, updateUnread } from '../redux/user/user.actions';
import { FlashMessage } from '../redux/utils/utils.types';
import { setFlashMessage } from '../redux/utils/utils.actions';
import { useTranslation } from 'react-i18next';
import { resumePaymentStart } from '../redux/payment/payment.actions';

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

const useWebsocket = (socket: Socket) => {
  const currentRoom = useSelector((state: RootState) => state.room.currentRoom);
  const currenUser = useSelector((state: RootState) => state.user.user);
  const rooms = useSelector((state: RootState) => state.room.rooms);
  const unread = useSelector((state: RootState) => state.user.unread);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    socket.on('connect_error', (err: any) => {
      console.log(`connect_error due to ${err.message}`);
      console.log(err);
    });
    socket.on('disconnect', (reason: any) => {
      socket?.connect();
      console.log(reason);
    });
    socket.on('messageReceived', (message: MsgReceived) => {
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
    socket.on('messageBlocked', (statusData: FlashMessage) => {
      dispatch(setFlashMessage(statusData));
    });
    socket.on('paymentFulfilled', (paymentData: FlashMessage) => {
      dispatch(setFlashMessage(paymentData));
      dispatch(getUserStart(currenUser?.id ?? ''));
    });
    socket.on('paymentToContinue', (paymentData: FlashMessage) => {
      const callback = (id: string): void => {
        dispatch(resumePaymentStart(id));
      };
      paymentData.callback = callback;
      dispatch(setFlashMessage(paymentData));
    });
    socket.on('userActive', (msg: ActiveUserMsg) => {
      dispatch(setActiveUser(msg));
    });
    socket.on('activeUsers', (msgs: ActiveUserMsg[]) => {
      dispatch(setActiveUsers(msgs));
    });
    socket.on('userLeft', (msg: ActiveUserMsg) => {
      dispatch(unsetActiveUser(msg));
    });
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
        let messages = rooms.find(
          (room) => room._id === lastUnreadId
        )?.messages;
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
    socket.emit('messageSent', msg);
  };

  return { sendMessage };
};

export default useWebsocket;
