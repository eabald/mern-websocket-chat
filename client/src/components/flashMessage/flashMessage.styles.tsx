import styled from 'styled-components';

interface ContainerProps {
  type: string
}

export const FlashMessageContainer = styled.div<ContainerProps>`
  display: block;
  padding: 20px;
  text-align: center;
  margin-bottom: 5px;
  background: ${props => props.theme.flashBg[props.type]};
  font-family: ${props => props.theme.font};
  color: ${props => props.theme.white};
  position: relative;
  @media only screen and (max-width: 768px) {
    display: flex;
    align-items: center;
    max-width: 100%;
  }
`;

export const FlashMessageClose = styled.div`
  position: absolute;
  top: 5px;
  right: 10px;
  cursor: pointer;
  &:hover {
    color: ${props => props.theme.white};
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
