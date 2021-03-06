// React
import React from 'react';
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

  return (
    <MessagesOutletWrapper>
      {messages
        ? messages.map((message) => (
            <MessageItem
              key={message._id}
              content={message.content}
              user={message.user}
              timestamp={message.timestamp}
            />
          ))
        : ''}
    </MessagesOutletWrapper>
  );
};
export default MessagesOutlet;
