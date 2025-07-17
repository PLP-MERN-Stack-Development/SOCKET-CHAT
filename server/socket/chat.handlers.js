const Message = require('../models/message.model');
const User = require('../models/user.model');

const setupChatHandlers = (io, socket) => {
  const joinRoom = async (roomId) => {
    try {
      if (!roomId) return;

      console.log(`🔗 User ${socket.userId} joining room: ${roomId}`);
      socket.join(roomId);

      const messages = await Message.find({ room: roomId })
        .populate('sender', 'username')
        .sort({ createdAt: 1 })
        .limit(50);

      socket.emit('previous_messages', messages);
    } catch (error) {
      console.error('❌ Error joining room:', error);
    }
  };

  const sendMessage = async ({ roomId, content }) => {
    try {
      if (!roomId || !content?.trim()) return;

      const message = new Message({
        content,
        sender: socket.userId,
        room: roomId,
      });

      await message.save();

      const populatedMessage = await Message.populate(message, {
        path: 'sender',
        select: 'username',
      });

      io.to(roomId).emit('new_message', populatedMessage);
    } catch (error) {
      console.error('❌ Error sending message:', error);
    }
  };

  const handleTyping = async ({ roomId }) => {
    if (!roomId) return;
    const user = await User.findById(socket.userId).select('username');
    if (user) {
      socket.to(roomId).emit('user_typing', user.username);
    }
  };

  const handleStopTyping = async ({ roomId }) => {
    if (!roomId) return;
    const user = await User.findById(socket.userId).select('username');
    if (user) {
      socket.to(roomId).emit('user_stopped_typing', user.username);
    }
  };

  socket.on('join_room', joinRoom);
  socket.on('send_message', sendMessage);
  socket.on('typing', handleTyping);
  socket.on('stop_typing', handleStopTyping);

  socket.on('disconnecting', () => {
    const rooms = Array.from(socket.rooms).filter((r) => r !== socket.id);
    rooms.forEach((roomId) => {
      socket.to(roomId).emit('user_stopped_typing', socket.userId);
    });
  });
};

module.exports = setupChatHandlers;
