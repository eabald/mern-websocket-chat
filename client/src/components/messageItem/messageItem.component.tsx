import React, { useEffect, useRef } from 'react';
import {
  MessageItemWrapper,
  MessageItemUser,
  MessageItemTimestamp,
  MessageItemContent,
} from './messageItem.styles';
import { User } from '../../redux/user/user.types';

type MessageItemProps = {
  key: string;
  content: string;
  user: User;
  timestamp: Date;
};

const MessageItem: React.FC<MessageItemProps> = ({
  key,
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
    <MessageItemWrapper ref={message} key={key}>
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
