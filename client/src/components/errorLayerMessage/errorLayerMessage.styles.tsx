import styled from 'styled-components';

export const ErrorLayerMessageContainer = styled.div`
  display: block;
  padding: 20px;
  text-align: center;
  background: #ca47c0;
  font-family: ${props => props.theme.font};
  color: #fff;
`;

export const ErrorLayerMessageText = styled.div`
  padding-left: 20px;
  text-transform: uppercase;
  display: inline-block;
`;
