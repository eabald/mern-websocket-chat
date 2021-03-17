// React
import React from 'react';
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

type HomeProps = {};

const Home: React.FC<HomeProps> = () => (
  <>
    <MainLayoutWrapper />
    <HomeWrapper>
      <HomeSideArea>
        <RoomsList />
        <DmsList />
      </HomeSideArea>
      <HomeMainArea>
        <MessagesOutlet />
      </HomeMainArea>
      <HomeInputArea>
        <MessageForm />
      </HomeInputArea>
      <HomeNavArea>
        <Navbar />
      </HomeNavArea>
    </HomeWrapper>
  </>
);
export default Home;
