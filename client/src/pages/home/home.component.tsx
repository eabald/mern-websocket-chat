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
// Components
import Navbar from '../../components/navbar/navbar.component';
import RoomsList from '../../components/roomsList/roomsList.component';
import UsersList from '../../components/usersList/usersList.component';
import MessageForm from '../../components/messageForm/messageForm.component';
import MessagesOutlet from '../../components/messagesOutlet/messagesOutlet.component';

type HomeProps = {};

const Home: React.FC<HomeProps> = () => (
  <HomeWrapper>
    <HomeSideArea>
      <RoomsList />
      <UsersList />
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
);
export default Home;
