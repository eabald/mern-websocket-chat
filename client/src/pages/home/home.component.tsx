import React, { useState } from 'react';
import useWebsocket from '../../hooks/useWebsocket';

import Navbar from '../../components/navbar/navbar.component';
import {
  HomeWrapper,
  HomeNavArea,
  HomeSideArea,
  HomeMainArea,
  HomeInputArea,
} from './home.styles';
import RoomsList from '../../components/roomsList/roomsList.component';

type HomeProps = {};

const Home: React.FC<HomeProps> = () => {
  const { messages, sendMessage } = useWebsocket();
  const [message, setMessage] = useState('');
  return (
    <HomeWrapper>
      <HomeNavArea>
        <Navbar />
      </HomeNavArea>
      <HomeSideArea>
        <RoomsList />
      </HomeSideArea>
      <HomeMainArea>
        <ul>
          {messages.map((message, i) => (
            <li key={i}>{message}</li>
          ))}
        </ul>
      </HomeMainArea>
      <HomeInputArea>
        <form onSubmit={() => sendMessage(message)}>
          <input
            type="text"
            name=""
            id=""
            onChange={(e) => setMessage(e.target.value)}
          />
          <input type="submit" value="send" />
        </form>
      </HomeInputArea>
    </HomeWrapper>
  );
};
export default Home;
