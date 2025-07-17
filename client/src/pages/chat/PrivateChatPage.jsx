import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useSocket } from '../../hooks/useSocket';
import Message from '../../components/chat/Message';
import ChatInput from '../../components/chat/ChatInput';

const PrivateChatPage = () => {
  const { userId } = useParams();
  const { user } = useAuth();
  const { socket } = useSocket();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!socket) return;

    const handlePrivateMessage = (message) => {
      setMessages((prev) => [...prev, message]);
    };

    socket.on('private_message', handlePrivateMessage);

    return () => {
      socket.off('private_message', handlePrivateMessage);
    };
  }, [socket]);

  const handleSendMessage = () => {
    if (message.trim() && socket) {
      socket.emit('private_message', { 
        to: userId, 
        message: message 
      });
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="p-4 bg-white border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">
          Private Chat with <span className="text-indigo-600">{userId}</span>
        </h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <Message 
            key={index} 
            message={msg} 
            isCurrentUser={msg.senderId === user?.userId} 
          />
        ))}
      </div>
      
      <div className="p-4 border-t border-gray-200 bg-white">
        <ChatInput
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onSend={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default PrivateChatPage;