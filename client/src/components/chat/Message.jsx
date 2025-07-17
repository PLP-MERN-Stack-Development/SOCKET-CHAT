const Message = ({ message, isCurrentUser }) => {
  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-4 py-2 ${isCurrentUser ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
        {!isCurrentUser && (
          <div className="font-semibold text-sm">{message.sender.username}</div>
        )}
        <div className="text-sm">{message.content}</div>
        <div className={`text-xs mt-1 ${isCurrentUser ? 'text-indigo-200' : 'text-gray-500'}`}>
          {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default Message;