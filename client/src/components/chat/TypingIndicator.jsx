// src/components/chat/TypingIndicator.jsx
const TypingIndicator = ({ users }) => {
  if (!users || users.length === 0) return null;

  return (
    <div className="px-4 py-2 text-sm italic text-gray-500 animate-pulse">
      {users.length === 1
        ? `${users[0]} is typing...`
        : `${users.join(' and ')} are typing...`}
    </div>
  );
};

export default TypingIndicator;
