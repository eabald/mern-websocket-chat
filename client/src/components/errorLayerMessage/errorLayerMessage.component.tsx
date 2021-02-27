import React from 'react';
import {
  ErrorLayerMessageContainer,
  ErrorLayerMessageText,
} from './errorLayerMessage.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBomb } from '@fortawesome/free-solid-svg-icons';

type ErrorLayerMessageProps = {
  message: string;
  onClickHandler: () => void;
};

const ErrorLayerMessage: React.FC<ErrorLayerMessageProps> = ({ message, onClickHandler }) => (
  <ErrorLayerMessageContainer onClick={onClickHandler}>
    <FontAwesomeIcon icon={faBomb} />
    <ErrorLayerMessageText>{message}</ErrorLayerMessageText>
  </ErrorLayerMessageContainer>
);
export default ErrorLayerMessage;
