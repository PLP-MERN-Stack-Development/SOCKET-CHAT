// src/pages/chat/ChatPage.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useChat } from '../../hooks/useChat';
import { useSocket } from '../../hooks/useSocket';

import ChatHeader from '../../components/chat/ChatHeader';
import ChatList from '../../components/chat/ChatList';
import ChatInput from '../../components/chat/ChatInput';
import RoomList from '../../components/chat/RoomList';
import UserList from '../../components/chat/UserList';
import Message from '../../components/chat/Message';

const ChatPage = () => {
  const { roomId } = useParams();
  const { user } = useAuth();
  const { socket } = useSocket();

  const [message, setMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [privateMessages, setPrivateMessages] = useState([]);

  // Public room chat (only used when no user selected)
  const {
    messages: publicMessages,
    typingUsers,
    sendMessage,
    sendTyping
  } = useChat(roomId);

  useEffect(() => {
    if (!socket) return;

    const handlePrivateMessage = (incomingMessage) => {
      const { senderId, receiverId } = incomingMessage;
      // Filter only messages related to current user and selected user
      if (
        (senderId === user.userId && receiverId === selectedUser?.id) ||
        (receiverId === user.userId && senderId === selectedUser?.id)
      ) {
        setPrivateMessages((prev) => [...prev, incomingMessage]);
      }
    };

    socket.on('private_message', handlePrivateMessage);

    return () => {
      socket.off('private_message', handlePrivateMessage);
    };
  }, [socket, user.userId, selectedUser]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      senderId: user.userId,
      receiverId: selectedUser?.id,
      sender: { username: user.username },
      content: message,
      createdAt: new Date().toISOString(),
    };

    if (selectedUser) {
      socket.emit('private_message', {
        to: selectedUser.id,
        message: newMessage,
      });
      setPrivateMessages((prev) => [...prev, newMessage]);
    } else {
      sendMessage(message);
    }

    setMessage('');
    if (!selectedUser) sendTyping(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-1/4 lg:w-1/5 bg-white border-r border-gray-200 flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Chat Rooms</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          <RoomList />
          <UserList onUserSelect={(user) => {
            setSelectedUser(user);
            setPrivateMessages([]); // clear old messages on new user
          }} />
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <ChatHeader
          title={
            selectedUser
              ? `Chat with ${selectedUser.username}`
              : `Room: ${roomId || 'General'}`
          }
        />

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {selectedUser ? (
            privateMessages.map((msg, i) => (
              <Message
                key={i}
                message={msg}
                isCurrentUser={msg.senderId === user.userId}
              />
            ))
          ) : (
            <ChatList
              messages={publicMessages}
              currentUserId={user.userId}
              typingUsers={typingUsers}
            />
          )}
        </div>

        <div className="p-4 border-t border-gray-200 bg-white">
          <ChatInput
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              if (!selectedUser) sendTyping(e.target.value.length > 0);
            }}
            onKeyDown={handleKeyDown}
            onSend={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
