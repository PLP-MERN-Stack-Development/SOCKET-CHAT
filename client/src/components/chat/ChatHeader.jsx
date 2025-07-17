// src/components/chat/ChatHeader.jsx
const ChatHeader = ({ title }) => {
  return (
    <div className="p-4 bg-white border-b border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800">
        {title || 'Select a user or room to start chatting'}
      </h3>
    </div>
  );
};

export default ChatHeader;
