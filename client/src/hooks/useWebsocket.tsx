import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { RootState } from '../redux/root-reducer';
import { useSelector } from 'react-redux';

const SOCKET_SERVER_URL = 'http://localhost:8000';

const useWebsocket = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const socketRef = useRef<any>();
  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL, {
      reconnectionAttempts: 5,
      reconnectionDelay: 5000,
      auth: { token },
    });
    socketRef.current.on('messageReceived', (message: string) => {
      setMessages((messages) => [...messages, message]);
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, [token]);

  const sendMessage = (messageBody: string) => {
    socketRef.current.emit('messageSent', { content: messageBody, user, room: {id: ''} });
  };

  return { messages, sendMessage };
};

export default useWebsocket;
