const ChatHeader = ({ roomId }) => {
  return (
    <div className="p-4 bg-white border-b border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800">
        {roomId ? `Room: ${roomId}` : 'Main Chat'}
      </h3>
    </div>
  );
};

export default ChatHeader;