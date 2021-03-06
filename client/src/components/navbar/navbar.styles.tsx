import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const NavbarContainer = styled.div`
  display: block;
  height: 100%;
  width: 100%;
  background: #2f3131;
  border-bottom: solid 1px #000;
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
  color: #ced7ff;
  text-transform: uppercase;
  font-size: 24px;
  text-align: center;
`;

export const NavbarLink = styled(Link)`
  display: block;
  height: 50px;
  width: 50px;
  font-size: 24px;
  line-height: 50px;
  text-align: center;
  color: #979696;
  &:hover {
    background: #3e3f3f;
    color: #e1e1e1;
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
  color: #979696;
  font-family: ${props => props.theme.font};
`;
