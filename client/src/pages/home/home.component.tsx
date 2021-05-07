// React
import React, { useRef, MouseEvent, useEffect } from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/root-reducer';
import { setFallbackBackground, updateMobileMenu } from '../../redux/utils/utils.actions';
// Styled
import {
  HomeWrapper,
  HomeNavArea,
  HomeSideArea,
  HomeMainArea,
  HomeInputArea,
} from './home.styles';
import { MainLayoutWrapper } from '../../layout/main/main.styles.layout';
// Components
import Navbar from '../../components/navbar/navbar.component';
import RoomsList from '../../components/roomsList/roomsList.component';
import DmsList from '../../components/dmsList/dmsList.component';
import MessageForm from '../../components/messageForm/messageForm.component';
import MessagesOutlet from '../../components/messagesOutlet/messagesOutlet.component';
import DesktopNotificationsConsent from '../../components/desktopNotificationsConsent/desktopNotificationsConsent.component';
import { useLocation } from 'react-router';

type HomeProps = {};

const Home: React.FC<HomeProps> = () => {
  const isOpen = useSelector((state: RootState) => state.utils.mobileMenuOpen);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    dispatch(setFallbackBackground(location));
  })
  const clickMenuHandle = (e: MouseEvent<HTMLDivElement>): void => {
    if (e.target !== mobileMenuRef.current && e.target !== navRef.current) {
      dispatch(updateMobileMenu(false));
    }
  };
  const closeMenuHandler = () => dispatch(updateMobileMenu(false));
  return (
    <>
      <MainLayoutWrapper />
      <HomeWrapper>
        <HomeSideArea
          onClick={clickMenuHandle}
          className={`${isOpen ? 'is-open' : ''}`}
          ref={mobileMenuRef}
        >
          <RoomsList />
          <DmsList />
        </HomeSideArea>
        <HomeMainArea onClick={closeMenuHandler}>
          <MessagesOutlet />
        </HomeMainArea>
        <HomeInputArea onClick={closeMenuHandler}>
          <MessageForm />
        </HomeInputArea>
        <HomeNavArea ref={navRef}>
          <Navbar />
        </HomeNavArea>
      </HomeWrapper>
      <DesktopNotificationsConsent />
    </>
  );
};
export default Home;
