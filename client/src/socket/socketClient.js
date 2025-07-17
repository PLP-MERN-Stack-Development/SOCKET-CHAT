// src/socket/socketClient.js
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

let socket;

export const socketClient = {
  connect: (token) => {
    socket = io(SOCKET_URL, {
      auth: { token }, // ✅ send token during handshake
      transports: ['websocket'], // optional, improves performance
    });
    return socket;
  },
  disconnect: () => {
    if (socket) socket.disconnect();
  },
  getSocket: () => socket,
};

export default socketClient;
