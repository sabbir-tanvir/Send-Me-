import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Update with your backend URL

// Register user
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

// Login user
export const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};

// Send message
export const sendMessage = async (messageData, token) => {
  const response = await axios.post(`${API_URL}/send`, messageData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Fetch inbox messages
export const fetchInboxMessages = async (token) => {
  const response = await axios.get(`${API_URL}/inbox`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};