const Message = require('../models/message.model');
const User = require('../models/user.model');

const setupPrivateHandlers = (io, socket) => {
  const sendPrivateMessage = async ({ recipientId, content }) => {
    try {
      const message = new Message({
        content,
        sender: socket.userId,
        recipient: recipientId,
        isPrivate: true,
      });
      
      await message.save();
      
      const populatedMessage = await Message.populate(message, [
        { path: 'sender', select: 'username' },
        { path: 'recipient', select: 'username' },
      ]);
      
      socket.to(recipientId).emit('private_message', populatedMessage);
      socket.emit('private_message', populatedMessage);
    } catch (error) {
      console.error('Error sending private message:', error);
    }
  };

  socket.on('private_message', sendPrivateMessage);
};

module.exports = setupPrivateHandlers;