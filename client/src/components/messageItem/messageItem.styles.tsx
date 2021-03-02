import styled from 'styled-components';

export const MessageItemWrapper = styled.div`
  padding: 5px 5px 10px;
  color: #ced7ff;
  border-top: solid 1px #000;
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
