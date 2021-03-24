import styled from 'styled-components';

export const ErrorLayerMessageContainer = styled.div`
  display: block;
  padding: 20px;
  text-align: center;
  background: ${props => props.theme.errorMessageBackground};
  font-family: ${props => props.theme.font};
  color: ${props => props.theme.white};
`;

export const ErrorLayerMessageText = styled.div`
  padding-left: 20px;
  text-transform: uppercase;
  display: inline-block;
`;
