import React, { useState } from 'react';
import useWebsocket from '../../hooks/useWebsocket';

type HomeProps = {};

const Home: React.FC<HomeProps> = () => {
  const { messages, sendMessage } = useWebsocket();
  const [message, setMessage] = useState('');
  return (<div>
    <ul>
      {messages.map((message, i) => (<li key={i}>{message}</li>))}
    </ul>
    <form onSubmit={() => sendMessage(message)}>
      <input type="text" name="" id="" onChange={e => setMessage(e.target.value)} />
      <input type="submit" value="send"/>
    </form>
  </div>);
};
export default Home;
