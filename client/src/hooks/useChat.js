import { useEffect, useState, useCallback, useRef } from 'react';
import { useSocket } from './useSocket';

export const useChat = (roomId) => {
  const { socket } = useSocket();

  const [messagesByRoom, setMessagesByRoom] = useState({});
  const [typingUsers, setTypingUsers] = useState([]);
  const typingUsersRef = useRef([]);

  useEffect(() => {
    typingUsersRef.current = typingUsers;
  }, [typingUsers]);

  useEffect(() => {
    if (!socket || !roomId) return;

    socket.emit('join_room', roomId);

    const handlePreviousMessages = (msgs) => {
      setMessagesByRoom((prev) => ({
        ...prev,
        [roomId]: msgs,
      }));
    };

    const handleNewMessage = (message) => {
      setMessagesByRoom((prev) => ({
        ...prev,
        [roomId]: [...(prev[roomId] || []), message],
      }));
    };

    const handleTyping = (username) => {
      if (!typingUsersRef.current.includes(username)) {
        setTypingUsers((prev) => [...prev, username]);
      }
    };

    const handleStopTyping = (username) => {
      setTypingUsers((prev) => prev.filter((name) => name !== username));
    };

    socket.on('previous_messages', handlePreviousMessages);
    socket.on('new_message', handleNewMessage);
    socket.on('user_typing', handleTyping);
    socket.on('user_stopped_typing', handleStopTyping);

    return () => {
      socket.off('previous_messages', handlePreviousMessages);
      socket.off('new_message', handleNewMessage);
      socket.off('user_typing', handleTyping);
      socket.off('user_stopped_typing', handleStopTyping);
    };
  }, [socket, roomId]);

  const sendMessage = useCallback(
    (content) => {
      if (socket && roomId && content.trim()) {
        socket.emit('send_message', { roomId, content });
      }
    },
    [socket, roomId]
  );

  const sendTyping = useCallback(
    (isTyping) => {
      if (socket && roomId) {
        socket.emit(isTyping ? 'typing' : 'stop_typing', { roomId });
      }
    },
    [socket, roomId]
  );

  // Messages for the active room only
  const messages = messagesByRoom[roomId] || [];

  return { messages, typingUsers, sendMessage, sendTyping };
};
