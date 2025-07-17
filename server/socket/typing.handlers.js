const setupTypingHandlers = (io, socket) => {
  const typingRooms = new Map(); // roomId => Set of userIds

  const handleTyping = ({ roomId, isTyping }) => {
    if (!roomId) return;

    if (!typingRooms.has(roomId)) {
      typingRooms.set(roomId, new Set());
    }

    const roomUsers = typingRooms.get(roomId);

    if (isTyping) {
      roomUsers.add(socket.userId);
    } else {
      roomUsers.delete(socket.userId);
    }

    io.to(roomId).emit('typing_users', Array.from(roomUsers));
  };

  socket.on('typing', handleTyping);

  socket.on('disconnect', () => {
    typingRooms.forEach((userSet, roomId) => {
      userSet.delete(socket.userId);
      io.to(roomId).emit('typing_users', Array.from(userSet));
    });
  });
};

module.exports = setupTypingHandlers;
