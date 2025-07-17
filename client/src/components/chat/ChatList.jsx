import Message from './Message';

const ChatList = ({ messages, currentUserId, typingUsers }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <Message 
          key={message._id} 
          message={message} 
          isCurrentUser={message.sender._id === currentUserId} 
        />
      ))}
      {typingUsers.length > 0 && (
        <div className="text-sm text-gray-500 italic">
          {typingUsers.length === 1 ? (
            `${typingUsers[0]} is typing...`
          ) : (
            `${typingUsers.join(' and ')} are typing...`
          )}
        </div>
      )}
    </div>
  );
};

export default ChatList;