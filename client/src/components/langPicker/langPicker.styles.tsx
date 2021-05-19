import styled from 'styled-components';
import gb from '../../images/flags/gb.svg'
import pl from '../../images/flags/pl.svg'

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
    z-index: ${props => props.theme.zIndexes.main};
    background: ${props => props.theme.mainBackground};
    &.is-open {
      left: 0;
    }
  }
`;

export const LangPickerFlag = styled.div`
  padding: 0 5px;
  cursor: pointer;
  background-size: contain;
  background-position: 50%;
  background-repeat: no-repeat;
  position: relative;
  display: inline-block;
  width: 22px;
  height: 12px;
  line-height: 1em;
  &:hover {
    transform: scale(1.25);
  }
  &:before {
    content: '';
  }
  &.active {
    filter: drop-shadow(0px 0px 5px ${props => props.theme.mainTextColor});
  }
  &.flag-icon-gb {
    background-image: url(${gb});
  }
  &.flag-icon-pl {
    background-image: url(${pl});
  }
`;
