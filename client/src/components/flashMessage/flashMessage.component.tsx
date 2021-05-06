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
  onCloseHandler?: (e: any) => void;
  type: string;
};

interface Theme {
  [x: string]: any;
}

const FlashMessage: React.FC<FlashMessageProps> = ({ message, onClickHandler, onCloseHandler, type }) => {

  const theme: Theme = useTheme();
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if(!onCloseHandler) {
      timeout = setTimeout(onClickHandler, 30000);
    }
    return () => {
      clearTimeout(timeout);
    }
  }, [onClickHandler, onCloseHandler])

  return (
  <FlashMessageContainer onClick={onClickHandler} type={type} >
    <FlashMessageClose>
      <FontAwesomeIcon icon={faTimes} onClick={onCloseHandler ? onCloseHandler : onClickHandler} />
    </FlashMessageClose>
    <FontAwesomeIcon icon={theme.flashIconsMap[type]} />
    <FlashMessageText>{message}</FlashMessageText>
  </FlashMessageContainer>
)};
export default FlashMessage;
