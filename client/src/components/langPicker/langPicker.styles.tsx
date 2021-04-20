import styled from 'styled-components';

export const LangPickerWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 5px;
  background: ${props => props.theme.modalBackground};
  border-top-right-radius: 3px;
  @media only screen and (max-width: 910px) {
    position: absolute;
    left: -100%;
    transition: left 0.5s ease-in;
    z-index: 1;
    background: ${props => props.theme.mainBackground};
    &.is-open {
      left: 0;
    }
  }
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
