// React
import React, { useEffect, useRef } from 'react';
// Types
import { User } from '../../redux/user/user.types';
// Styled
import {
  MessageItemWrapper,
  MessageItemUser,
  MessageItemTimestamp,
  MessageItemContent,
} from './messageItem.styles';

type MessageItemProps = {
  content: string;
  user: User;
  timestamp: Date;
};

const MessageItem: React.FC<MessageItemProps> = ({
  content,
  user,
  timestamp,
}) => {
  const message = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (message.current) {
      message.current?.scrollIntoView({ behavior: 'smooth' })
    }
  })
  return (
    <MessageItemWrapper ref={message}>
      <MessageItemUser>
        {user.username}
        <MessageItemTimestamp>
          {(new Date(timestamp)).toLocaleString('en-US')}
        </MessageItemTimestamp>
      </MessageItemUser>
      <MessageItemContent>{content}</MessageItemContent>
    </MessageItemWrapper>
  );
};
export default MessageItem;
