import axios from 'axios';

const API_URL = '/api/habits/';

// Get all habits for logged in user
const getHabits = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const response = await axios.get(API_URL, config);
    return response.data;
  }
  throw new Error('No user token found');
};

// Get single habit
const getHabit = async (id) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const response = await axios.get(API_URL + id, config);
    return response.data;
  }
  throw new Error('No user token found');
};

// Create new habit
const createHabit = async (habitData) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const response = await axios.post(API_URL, habitData, config);
    return response.data;
  }
  throw new Error('No user token found');
};

// Update habit
const updateHabit = async (id, habitData) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const response = await axios.put(API_URL + id, habitData, config);
    return response.data;
  }
  throw new Error('No user token found');
};

// Delete habit
const deleteHabit = async (id) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const response = await axios.delete(API_URL + id, config);
    return response.data;
  }
  throw new Error('No user token found');
};

// Mark habit as completed
const completeHabit = async (id) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const response = await axios.put(API_URL + id + '/complete', {}, config);
    return response.data;
  }
  throw new Error('No user token found');
};

// Get user statistics
const getUserStats = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const response = await axios.get(API_URL + 'stats', config);
    return response.data;
  }
  throw new Error('No user token found');
};

export default {
  getHabits,
  getHabit,
  createHabit,
  updateHabit,
  deleteHabit,
  completeHabit,
  getUserStats
};