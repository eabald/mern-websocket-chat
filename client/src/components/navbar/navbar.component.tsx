// React
import React from 'react';
import { useLocation } from 'react-router-dom';
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
  const currentRoom = useSelector(
    (state: RootState) => state.room.currentRoom?.name
  );
  const location = useLocation();
  return (
    <NavbarContainer>
      <NavbarLinksWrapper>
        <NavbarGreetings>Hi {username}</NavbarGreetings>
        <NavbarCurrentRoom>
          {currentRoom ? `# ${currentRoom}` : ''}
        </NavbarCurrentRoom>
        <NavbarLink
          to={{
            pathname: '/profile',
            state: { background: location },
          }}
        >
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
