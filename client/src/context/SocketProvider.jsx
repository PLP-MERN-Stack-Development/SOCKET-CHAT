import { useEffect, useState } from 'react';
import SocketContext from './SocketContext';
import { socketClient } from '../socket/socketClient';
import { useAuth } from '../hooks/useAuth';

const SocketProvider = ({ children }) => {
  const { isAuthenticated, token } = useAuth();
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    let newSocket;

    if (isAuthenticated && token) {
      console.log('🔌 Attempting to connect socket with token:', token);

      // Connect the socket with auth token
      newSocket = socketClient.connect(token);
      setSocket(newSocket);

      newSocket.on('connect', () => {
        console.log('✅ Socket connected');
        setIsConnected(true);
      });

      newSocket.on('disconnect', () => {
        console.log('❌ Socket disconnected');
        setIsConnected(false);
      });
    }

    return () => {
      if (newSocket && newSocket.connected) {
        console.log('🧹 Cleaning up socket');
        newSocket.disconnect();
        setIsConnected(false);
        setSocket(null);
      }
    };
  }, [isAuthenticated, token]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
