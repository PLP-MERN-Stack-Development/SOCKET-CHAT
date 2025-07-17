// src/pages/chat/ChatPage.jsx
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useChat } from '../../hooks/useChat';
import ChatHeader from '../../components/chat/ChatHeader';
import ChatList from '../../components/chat/ChatList';
import ChatInput from '../../components/chat/ChatInput';
import RoomList from '../../components/chat/RoomList';
import UserList from '../../components/chat/UserList';

const ChatPage = () => {
  const { roomId } = useParams();
  const { user } = useAuth();
  const { messages, typingUsers, sendMessage, sendTyping } = useChat(roomId);
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
      sendTyping(false);
    }
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
          <UserList />
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <ChatHeader roomId={roomId} />
        <ChatList 
          messages={messages} 
          currentUserId={user?.userId} 
          typingUsers={typingUsers} 
        />
        <div className="p-4 border-t border-gray-200 bg-white">
          <ChatInput
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              sendTyping(e.target.value.length > 0);
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
