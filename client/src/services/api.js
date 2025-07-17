import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const register = async (username, email, password) => {
  const response = await api.post('/auth/register', { username, email, password });
  return response.data;
};

export const getRooms = async () => {
  const response = await api.get('/chat/rooms');
  return response.data;
};

export const createRoom = async (name) => {
  const response = await api.post('/chat/rooms', { name });
  return response.data;
};

export const getMessages = async (roomId) => {
  const response = await api.get(`/messages/${roomId}`);
  return response.data;
};

export default api;