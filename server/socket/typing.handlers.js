const User = require('../models/user.model');

const setupTypingHandlers = (io, socket) => {
  const typingUsers = new Set();

  const handleTyping = ({ roomId, isTyping }) => {
    try {
      if (isTyping) {
        typingUsers.add(socket.userId);
      } else {
        typingUsers.delete(socket.userId);
      }
      
      io.to(roomId).emit('typing_users', Array.from(typingUsers));
    } catch (error) {
      console.error('Error handling typing:', error);
    }
  };

  socket.on('typing', handleTyping);

  socket.on('disconnect', () => {
    typingUsers.delete(socket.userId);
    socket.broadcast.emit('typing_users', Array.from(typingUsers));
  });
};

module.exports = setupTypingHandlers;