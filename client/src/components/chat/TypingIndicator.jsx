const TypingIndicator = ({ users }) => {
  if (!users || users.length === 0) return null;

  return (
    <div className="typing-indicator">
      {users.length === 1 ? (
        `${users[0]} is typing...`
      ) : (
        `${users.join(' and ')} are typing...`
      )}
    </div>
  );
};

export default TypingIndicator;