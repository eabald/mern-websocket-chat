import React from 'react';
import { NavbarContainer, NavbarLinksWrapper, NavbarLink } from './navbar.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff, faUser } from '@fortawesome/free-solid-svg-icons'

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <NavbarContainer>
      <NavbarLinksWrapper>
        <NavbarLink to="/profile">
          <FontAwesomeIcon icon={faUser} />
        </NavbarLink>
        <NavbarLink to="/logout">
          <FontAwesomeIcon icon={faPowerOff} />
        </NavbarLink>
      </NavbarLinksWrapper>
    </NavbarContainer>
  );
};
export default Navbar;
