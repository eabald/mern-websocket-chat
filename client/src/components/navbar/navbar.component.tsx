// React
import React, { useRef, MouseEvent } from 'react';
import { useLocation } from 'react-router-dom';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/root-reducer';
// I18N
import { useTranslation } from 'react-i18next';
// Styled
import {
  NavbarContainer,
  NavbarLinksWrapper,
  NavbarLink,
  NavbarGreetings,
  NavbarCurrentRoom,
  NavbarHamburger
} from './navbar.styles';
// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff, faUser } from '@fortawesome/free-solid-svg-icons';
import Hamburger from '../hamburger/hamburger.component';
import { updateMobileMenu } from '../../redux/utils/utils.actions';

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  const { t } = useTranslation();
  const hamburger = useRef<HTMLDivElement>(null);
  const username = useSelector((state: RootState) => state.user.user?.username);
  const isOpen = useSelector((state: RootState) => state.utils.mobileMenuOpen);
  const currentRoom = useSelector(
    (state: RootState) => state.room.currentRoom?.name
  );
  const location = useLocation();
  const dispatch = useDispatch();
  const clickNavHandler = (e: MouseEvent<HTMLDivElement>): void => {
    if (e.target !== hamburger.current) {
      dispatch(updateMobileMenu(false));
    }
  }
  const clickHamburgerHandler = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    dispatch(updateMobileMenu(!isOpen))
  };

  return (
    <NavbarContainer onClick={clickNavHandler}>
      <NavbarLinksWrapper>
        <NavbarGreetings>{t('Hi')} {username}</NavbarGreetings>
        <NavbarHamburger ref={hamburger} onClick={clickHamburgerHandler}>
          <Hamburger />
        </NavbarHamburger>
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
