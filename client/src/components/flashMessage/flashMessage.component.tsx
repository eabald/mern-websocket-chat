// React
import React, { useEffect } from 'react';
// Styled
import {
  FlashMessageContainer,
  FlashMessageText,
  FlashMessageClose,
} from './flashMessage.styles';
// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from 'styled-components';

type FlashMessageProps = {
  message: string;
  onClickHandler: () => void;
  type: string;
};

interface Theme {
  [x: string]: any;
}

const FlashMessage: React.FC<FlashMessageProps> = ({ message, onClickHandler, type }) => {

  const theme: Theme = useTheme();
  useEffect(() => {
    setTimeout(onClickHandler, 30000);
  }, [onClickHandler])

  return (
  <FlashMessageContainer onClick={onClickHandler} type={type} >
    <FlashMessageClose>
      <FontAwesomeIcon icon={faTimes} onClick={onClickHandler} />
    </FlashMessageClose>
    <FontAwesomeIcon icon={theme.flashIconsMap[type]} />
    <FlashMessageText>{message}</FlashMessageText>
  </FlashMessageContainer>
)};
export default FlashMessage;
