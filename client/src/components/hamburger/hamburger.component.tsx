// React
import React from 'react';
// Redux
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/root-reducer';
// Styled
import { HamburgerWrapper } from './hamburger.styles';
// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

type HamburgerProps = {};

const Hamburger: React.FC<HamburgerProps> = () => {
  const isOpen = useSelector((state: RootState) => state.utils.mobileMenuOpen);
  return (
    <HamburgerWrapper className={`${isOpen ? 'is-open' : ''}`}>
      <FontAwesomeIcon icon={faBars} />
    </HamburgerWrapper>
  );
};
export default Hamburger;
