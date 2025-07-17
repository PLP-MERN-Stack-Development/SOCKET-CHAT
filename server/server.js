// Load environment variables quietly
require('dotenv').config({ quiet: true });

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');

// Custom modules
const connectDB = require('./config/db.config');
const { corsOptions, socketOptions } = require('./config/server.config');
const errorHandler = require('./middlewares/error.middleware');

const setupChatHandlers = require('./socket/chat.handlers');
const setupPrivateHandlers = require('./socket/private.handlers');
const setupTypingHandlers = require('./socket/typing.handlers');
const User = require('./models/user.model');

// ✅ Confirm environment setup without leaking secrets
console.log('🔐 Environment variables loaded successfully');

// Connect to MongoDB
connectDB();

// Initialize Express and HTTP server
const app = express();
const server = http.createServer(app);
const io = new Server(server, socketOptions);

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// REST API routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/chat', require('./routes/chat.routes'));
app.use('/api/messages', require('./routes/message.routes'));

// Root route
app.get('/', (req, res) => {
  res.send('🚀 Socket.io Chat Server is running');
});

// Global error handler
app.use(errorHandler);

// 🔄 Helper: Broadcast current users
const broadcastUserList = async () => {
  const users = await User.find({}, 'username online');
  io.emit('user_list', users.map(u => ({
    id: u._id.toString(),
    username: u.username,
    online: u.online,
  })));
};

// ✅ Inline socket.io token authentication middleware (safe)
io.use((socket, next) => {
  try {
    const token = socket.handshake.auth?.token;
    if (!token) {
      console.log('❌ No token provided in handshake');
      return next(new Error('Authentication error'));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = decoded.userId;
    console.log(`✅ Socket authenticated for userId: ${socket.userId}`);
    next();
  } catch (err) {
    console.error('❌ Token verification failed:', err.message);
    next(new Error('Authentication error'));
  }
});

// Handle Socket.io connections
io.on('connection', (socket) => {
  console.log(`🔌 User connected: ${socket.userId}`);

  // Mark user online
  User.findByIdAndUpdate(socket.userId, {
    online: true,
    lastSeen: new Date(),
  })
    .then(() => broadcastUserList())
    .catch(console.error);

  // Register socket event handlers
  setupChatHandlers(io, socket);
  setupPrivateHandlers(io, socket);
  setupTypingHandlers(io, socket);

  socket.on('disconnect', () => {
    console.log(`❌ User disconnected: ${socket.userId}`);
    User.findByIdAndUpdate(socket.userId, {
      online: false,
      lastSeen: new Date(),
    })
      .then(() => broadcastUserList())
      .catch(console.error);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
