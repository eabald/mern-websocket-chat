import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/root-reducer';
import { MessagesOutletWrapper } from './messagesOutlet.styles';

type MessagesOutletProps = {};

const MessagesOutlet:React.FC<MessagesOutletProps> = () => {
  const messages = useSelector((state: RootState) => state.room.currentRoom?.messages);

  return (
    <MessagesOutletWrapper>
      { messages ? messages.map(messageItem => (
        <div key={messageItem._id}>{messageItem.content}</div>
      )) : ''}
    </MessagesOutletWrapper>
  );
}
export default MessagesOutlet;
