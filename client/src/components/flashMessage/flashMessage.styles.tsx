import styled from 'styled-components';

export const FlashMessageContainer = styled.div`
  display: block;
  padding: 20px;
  text-align: center;
  background: ${props => props.theme.errorMessageBackground};
  font-family: ${props => props.theme.font};
  color: ${props => props.theme.white};
  @media only screen and (max-width: 768px) {
    display: flex;
    align-items: center;
    max-width: 100%;
  }
`;

export const FlashMessageText = styled.div`
  padding-left: 20px;
  text-transform: uppercase;
  display: inline-block;
  @media only screen and (max-width: 768px) {
    word-break: break-all;
  }
`;
