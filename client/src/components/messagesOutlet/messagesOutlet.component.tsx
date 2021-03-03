import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/root-reducer';
import { MessagesOutletWrapper } from './messagesOutlet.styles';
import MessageItem from '../messageItem/messageItem.component';

type MessagesOutletProps = {};

const MessagesOutlet: React.FC<MessagesOutletProps> = () => {
  const messages = useSelector(
    (state: RootState) => state.room.currentRoom?.messages
  );

  return (
    <MessagesOutletWrapper>
      {messages
        ? messages.map((message) => (
            <MessageItem
              key={message._id}
              content={message.content}
              user={message.user}
              timestamp={message.timestamp}
            ></MessageItem>
          ))
        : ''}
    </MessagesOutletWrapper>
  );
};
export default MessagesOutlet;