import styled from 'styled-components';

export const BackButtonElement = styled.button`
  background: ${props => props.theme.navBackground};
  border: 0;
  appearance: none;
  position: absolute;
  top: 0;
  right: 0;
  display: block;
  height: 50px;
  width: 50px;
  font-size: 24px;
  line-height: 50px;
  text-align: center;
  color: ${props => props.theme.navTextColor};
  cursor: pointer;
  &:hover {
    background: ${props => props.theme.navBackgroundHover};
    color: ${props => props.theme.navBackgroundHoverColor};
  }
`;
