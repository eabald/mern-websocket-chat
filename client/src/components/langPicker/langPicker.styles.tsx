import styled from 'styled-components';

export const LangPickerWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 5px;
  background: ${props => props.theme.modalBackground};
  border-top-right-radius: 3px;
`;

export const LangPickerFlag = styled.span`
  padding: 0 5px;
  cursor: pointer;
  &:hover {
    transform: scale(1.25);
  }
  &.active {
    filter: drop-shadow(0px 0px 5px ${props => props.theme.mainTextColor});
  }
`;
