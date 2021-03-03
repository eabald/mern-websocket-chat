// React
import React from 'react';
// Redux
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/root-reducer';
// Styled
import {
  NavbarContainer,
  NavbarLinksWrapper,
  NavbarLink,
  NavbarGreetings,
  NavbarCurrentRoom,
} from './navbar.styles';
// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff, faUser } from '@fortawesome/free-solid-svg-icons';

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  const username = useSelector((state: RootState) => state.user.user?.username);
  const currentRoom = useSelector((state: RootState) => state.room.currentRoom?.name)
  return (
    <NavbarContainer>
      <NavbarLinksWrapper>
        <NavbarGreetings>Hi {username}</NavbarGreetings>
        <NavbarCurrentRoom>{currentRoom ? `# ${currentRoom}` : ''}</NavbarCurrentRoom>
        <NavbarLink to='/profile'>
          <FontAwesomeIcon icon={faUser} />
        </NavbarLink>
        <NavbarLink to='/logout'>
          <FontAwesomeIcon icon={faPowerOff} />
        </NavbarLink>
      </NavbarLinksWrapper>
    </NavbarContainer>
  );
};
export default Navbar;
