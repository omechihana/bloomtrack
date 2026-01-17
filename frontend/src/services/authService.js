import axios from 'axios';

const API_URL = '/api/auth/';

// Set up axios defaults
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + 'register', userData);
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

// Logout user
const logout = async () => {
  // Clear user from localStorage
  localStorage.removeItem('user');
  // Call logout endpoint
  return await axios.post(API_URL + 'logout');
};

// Get user profile
const getProfile = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const response = await axios.get(API_URL + 'profile', config);
    return response.data;
  }
  throw new Error('No user token found');
};

// Get current user
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

// Update user in localStorage
const updateUser = (userData) => {
  localStorage.setItem('user', JSON.stringify(userData));
};

export default {
  register,
  login,
  logout,
  getProfile,
  getCurrentUser,
  updateUser
};