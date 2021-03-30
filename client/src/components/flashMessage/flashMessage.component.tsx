// React
import React from 'react';
// Styled
import {
  FlashMessageContainer,
  FlashMessageText,
} from './flashMessage.styles';
// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBomb } from '@fortawesome/free-solid-svg-icons';

type FlashMessageProps = {
  message: string;
  onClickHandler: () => void;
};

const FlashMessage: React.FC<FlashMessageProps> = ({ message, onClickHandler }) => (
  <FlashMessageContainer onClick={onClickHandler}>
    <FontAwesomeIcon icon={faBomb} />
    <FlashMessageText>{message}</FlashMessageText>
  </FlashMessageContainer>
);
export default FlashMessage;
