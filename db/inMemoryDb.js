// In-memory database for development when MongoDB is unavailable
const inMemoryUsers = [];
const inMemoryHabits = [];

module.exports = {
  users: inMemoryUsers,
  habits: inMemoryHabits,
  
  // User operations
  createUser: async (userData) => {
    const user = {
      _id: Date.now().toString(),
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    inMemoryUsers.push(user);
    return user;
  },
  
  findUserByEmail: async (email) => {
    return inMemoryUsers.find(u => u.email === email);
  },
  
  findUserById: async (id) => {
    return inMemoryUsers.find(u => u._id === id);
  },
  
  // Habit operations
  createHabit: async (habitData) => {
    const habit = {
      _id: Date.now().toString(),
      ...habitData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    inMemoryHabits.push(habit);
    return habit;
  },
  
  getUserHabits: async (userId) => {
    return inMemoryHabits.filter(h => h.userId === userId);
  },
  
  updateHabit: async (habitId, updateData) => {
    const habit = inMemoryHabits.find(h => h._id === habitId);
    if (habit) {
      Object.assign(habit, updateData, { updatedAt: new Date() });
    }
    return habit;
  },
  
  deleteHabit: async (habitId) => {
    const index = inMemoryHabits.findIndex(h => h._id === habitId);
    if (index > -1) {
      return inMemoryHabits.splice(index, 1)[0];
    }
    return null;
  }
};
