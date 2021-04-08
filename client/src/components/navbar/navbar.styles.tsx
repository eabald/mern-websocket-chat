import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const NavbarContainer = styled.div`
  display: block;
  height: 100%;
  width: 100%;
  background: ${props => props.theme.navBackground};
  border-bottom: solid 1px ${props => props.theme.black};
`

export const NavbarLinksWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: space-between;
`

export const NavbarGreetings = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
  margin-right: auto;
  font-family: ${props => props.theme.font};
  color: ${props => props.theme.mainTextColor};
  text-transform: uppercase;
  font-size: 24px;
  text-align: center;
  @media only screen and (max-width: 910px) {
    display: none;
  }
`;

export const NavbarLink = styled(Link)`
  display: block;
  height: 50px;
  width: 50px;
  font-size: 24px;
  line-height: 50px;
  text-align: center;
  color: ${props => props.theme.navTextColor};
  &:hover {
    background: ${props => props.theme.navBackgroundHover};
    color: ${props => props.theme.navBackgroundHoverColor};
  }
`

export const NavbarCurrentRoom = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  height: 50px;
  font-size: 18px;
  line-height: 50px;
  text-align: center;
  color: ${props => props.theme.navTextColor};
  font-family: ${props => props.theme.font};
  @media only screen and (max-width: 910px) {
    margin-left: auto;
    text-overflow: ellipsis;
    width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-align: right;
    display: block;
  }
`;

export const NavbarHamburger = styled.div`
  display: none;
  @media only screen and (max-width: 910px) {
    display: block
  }
`;
