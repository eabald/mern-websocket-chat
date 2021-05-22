import React from 'react'
import socketio from 'socket.io-client';

const SOCKET_SERVER_URL = '';

export const socket = socketio(SOCKET_SERVER_URL);
export const SocketContext = React.createContext(socket);
