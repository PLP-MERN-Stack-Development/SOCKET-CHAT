const Message = require('../models/message.model');
const User = require('../models/user.model');

const setupPrivateHandlers = (io, socket) => {
  const getPrivateRoomId = (userA, userB) =>
    [userA, userB].sort().join('_'); // consistent room id

  const joinPrivateChat = async ({ otherUserId }) => {
    const roomId = getPrivateRoomId(socket.userId, otherUserId);
    socket.join(roomId);

    const messages = await Message.find({
      isPrivate: true,
      $or: [
        { sender: socket.userId, recipient: otherUserId },
        { sender: otherUserId, recipient: socket.userId },
      ],
    })
      .sort({ createdAt: 1 })
      .populate('sender', 'username')
      .populate('recipient', 'username');

    socket.emit('previous_messages', messages);
  };

  const sendPrivateMessage = async ({ recipientId, content }) => {
    if (!content?.trim()) return;

    const roomId = getPrivateRoomId(socket.userId, recipientId);

    const message = new Message({
      content,
      sender: socket.userId,
      recipient: recipientId,
      isPrivate: true,
    });

    await message.save();

    const populatedMessage = await message.populate([
      { path: 'sender', select: 'username' },
      { path: 'recipient', select: 'username' },
    ]);

    io.to(roomId).emit('private_message', populatedMessage);
  };

  const handleTyping = ({ recipientId, isTyping }) => {
    const roomId = getPrivateRoomId(socket.userId, recipientId);
    const event = isTyping ? 'user_typing' : 'user_stopped_typing';

    User.findById(socket.userId).then((user) => {
      if (user) {
        socket.to(roomId).emit(event, user.username);
      }
    });
  };

  socket.on('join_private_chat', joinPrivateChat);
  socket.on('private_message', sendPrivateMessage);
  socket.on('typing_private', handleTyping);
};

module.exports = setupPrivateHandlers;
