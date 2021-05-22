// React
import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
// Redux
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/root-reducer';
// I18N
import { useTranslation } from 'react-i18next';
// Types
import { User } from '../../redux/user/user.types';
// Styled
import {
  MessageItemWrapper,
  MessageItemUser,
  MessageItemTimestamp,
  MessageItemContent,
  MessageItemUsername,
} from './messageItem.styles';
// Components
import ActiveIcon from '../activeIcon/activeIcon.component'

type MessageItemProps = {
  content: string;
  user: User;
  timestamp: Date;
  active?: boolean;
};

const MessageItem: React.FC<MessageItemProps> = ({
  content,
  user,
  timestamp,
  active
}) => {
  const { t } = useTranslation();
  const message = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const currentUserId = useSelector((state: RootState) => state.user.user?._id);
  useEffect(() => {
    if (message.current) {
      message.current?.scrollIntoView({ behavior: 'smooth' })
    }
  })
  return (
    <MessageItemWrapper ref={message}>
      <MessageItemUser>
        <MessageItemUsername to={{
            pathname: currentUserId === user._id ? `/${t('profile')}` : `/modal/${t('user-details')}/${user._id}`,
            state: { background: location }
          }}>{user.username}</MessageItemUsername>
          {active ? <ActiveIcon /> : ''}
        <MessageItemTimestamp>
          {(new Date(timestamp)).toLocaleString('en-US')}
        </MessageItemTimestamp>
      </MessageItemUser>
      <MessageItemContent>{content}</MessageItemContent>
    </MessageItemWrapper>
  );
};
export default MessageItem;
