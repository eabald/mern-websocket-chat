import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const MessageItemWrapper = styled.div`
  padding: 5px;
  color: ${props => props.theme.mainTextColor};
  margin: 5px;
  background: rgb(90, 90, 90);
  border-radius: 5px;
  box-shadow: 0 0 2px 1px rgb(150 150 150 / 50%);
`;

export const MessageItemUser = styled.div`
  font-family: ${props=> props.theme.font};
  font-size: 14px;
  font-weight: 700;
  padding-bottom: 5px;
`;

export const MessageItemTimestamp = styled.div`
  font-family: ${props=> props.theme.font};
  font-size: 10px;
  display: inline-block;
  padding-left: 10px;
`;

export const MessageItemContent = styled.div`
  font-family: ${props=> props.theme.font};
  font-size: 12px;
`;

export const MessageItemUsername = styled(Link)`
  cursor: pointer;
  font-family: ${props=> props.theme.font};
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  color: ${props => props.theme.mainTextColor};
  &:hover {
    text-decoration: underline;
  }
`;
