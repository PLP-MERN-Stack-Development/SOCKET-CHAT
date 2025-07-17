// server/middlewares/socket.middleware.js

// Utility to wrap middleware for socket.io
const wrap = (middleware) => (socket, next) => middleware(socket, next);

module.exports = { wrap };
