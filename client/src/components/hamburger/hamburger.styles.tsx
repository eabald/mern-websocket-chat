import styled from 'styled-components';

export const HamburgerWrapper = styled.div`
  display: block;
  height: 50px;
  width: 50px;
  font-size: 24px;
  line-height: 50px;
  text-align: center;
  color: ${(props) => props.theme.navTextColor};
  &:hover,
  &.is-open {
    background: ${(props) => props.theme.navBackgroundHover};
    color: ${(props) => props.theme.navBackgroundHoverColor};
  }
`;
