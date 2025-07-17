export const API_ROUTES = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  ROOMS: '/chat/rooms',
  MESSAGES: '/messages',
};

export const SOCKET_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  JOIN_ROOM: 'join_room',
  NEW_MESSAGE: 'new_message',
  TYPING: 'typing',
  PRIVATE_MESSAGE: 'private_message',
};