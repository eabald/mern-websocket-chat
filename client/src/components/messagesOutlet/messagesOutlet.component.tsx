// React
import React, { useEffect, useState } from 'react';
// Redux
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/root-reducer';
// Styled
import { MessagesOutletWrapper } from './messagesOutlet.styles';
// Components
import MessageItem from '../messageItem/messageItem.component';

type MessagesOutletProps = {};

const MessagesOutlet: React.FC<MessagesOutletProps> = () => {
  const messages = useSelector(
    (state: RootState) => state.room.currentRoom?.messages
  );
  const rooms = useSelector(
    (state: RootState) => state.room.rooms
  );
  const currentRoomId = useSelector(
    (state: RootState) => state.room.currentRoom?._id
  );
  const [active, setActive] = useState(false);

  useEffect(() => {
    const currentRoomActive = rooms.find(room => room._id === currentRoomId)?.active;
    setActive(!!currentRoomActive);
  }, [rooms, currentRoomId])

  return (
    <MessagesOutletWrapper>
      {messages
        ? messages.map((message) => (
            <MessageItem
              key={message._id}
              content={message.content}
              user={message.user}
              timestamp={message.timestamp}
              active={active}
            />
          ))
        : ''}
    </MessagesOutletWrapper>
  );
};
export default MessagesOutlet;
