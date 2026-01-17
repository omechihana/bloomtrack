const Habit = require('../models/Habit');
const User = require('../models/User');

// @desc    Get all habits for logged in user
// @route   GET /api/habits
// @access  Private
const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(habits);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error getting habits' });
  }
};

// @desc    Get single habit
// @route   GET /api/habits/:id
// @access  Private
const getHabit = async (req, res) => {
  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    res.json(habit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error getting habit' });
  }
};

// @desc    Create new habit
// @route   POST /api/habits
// @access  Private
const createHabit = async (req, res) => {
  try {
    const { title, description, frequency } = req.body;

    // Validation
    if (!title || !description || !frequency) {
      return res.status(400).json({ message: 'Please provide title, description, and frequency' });
    }

    const habit = new Habit({
      title,
      description,
      frequency,
      userId: req.user._id
    });

    await habit.save();
    res.status(201).json(habit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error creating habit' });
  }
};

// @desc    Update habit
// @route   PUT /api/habits/:id
// @access  Private
const updateHabit = async (req, res) => {
  try {
    const { title, description, frequency, isActive } = req.body;

    const habit = await Habit.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    // Update fields if provided
    if (title !== undefined) habit.title = title;
    if (description !== undefined) habit.description = description;
    if (frequency !== undefined) habit.frequency = frequency;
    if (isActive !== undefined) habit.isActive = isActive;

    await habit.save();
    res.json(habit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error updating habit' });
  }
};

// @desc    Delete habit
// @route   DELETE /api/habits/:id
// @access  Private
const deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    res.json({ message: 'Habit removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error deleting habit' });
  }
};

// @desc    Mark habit as completed
// @route   PUT /api/habits/:id/complete
// @access  Private
const completeHabit = async (req, res) => {
  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    // Check if already completed today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const existingCompletion = habit.completedDates.find(dateObj => 
      new Date(dateObj.date).setHours(0, 0, 0, 0) === today.getTime()
    );

    if (existingCompletion) {
      return res.status(400).json({ message: 'Habit already completed today' });
    }

    // Calculate streak
    let streakCount = 0;
    if (habit.completedDates.length > 0) {
      // Sort by date descending to get the latest completion
      const sortedDates = [...habit.completedDates].sort((a, b) => new Date(b.date) - new Date(a.date));
      const lastCompletedDate = new Date(sortedDates[0].date);
      
      // Check if yesterday was completed (for streak)
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (lastCompletedDate.setHours(0, 0, 0, 0) === yesterday.getTime()) {
        streakCount = sortedDates[0].streakCount + 1;
      } else if (lastCompletedDate.setHours(0, 0, 0, 0) === today.getTime()) {
        // Already completed today
        return res.status(400).json({ message: 'Habit already completed today' });
      } else {
        // Reset streak
        streakCount = 1;
      }
    } else {
      // First completion
      streakCount = 1;
    }

    // Add completion date
    habit.completedDates.push({
      date: new Date(),
      streakCount
    });

    await habit.save();

    res.json({
      message: 'Habit marked as completed',
      habit
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error completing habit' });
  }
};

// @desc    Get user statistics
// @route   GET /api/habits/stats
// @access  Private
const getUserStats = async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.user._id });
    
    if (habits.length === 0) {
      return res.json({
        totalHabits: 0,
        completedToday: 0,
        activeStreak: 0,
        completionRate: 0
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Count habits completed today
    let completedToday = 0;
    habits.forEach(habit => {
      const todayCompletion = habit.completedDates.find(dateObj => 
        new Date(dateObj.date).setHours(0, 0, 0, 0) === today.getTime()
      );
      if (todayCompletion) {
        completedToday++;
      }
    });

    // Calculate max streak
    let activeStreak = 0;
    let totalCompletions = 0;
    
    habits.forEach(habit => {
      totalCompletions += habit.completedDates.length;
      
      // Find the latest streak
      if (habit.completedDates.length > 0) {
        const sortedDates = [...habit.completedDates].sort((a, b) => new Date(b.date) - new Date(a.date));
        const currentStreak = sortedDates[0].streakCount;
        if (currentStreak > activeStreak) {
          activeStreak = currentStreak;
        }
      }
    });

    // Calculate completion rate
    const completionRate = habits.length > 0 
      ? Math.round((completedToday / habits.length) * 100) 
      : 0;

    res.json({
      totalHabits: habits.length,
      completedToday,
      activeStreak,
      completionRate
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error getting stats' });
  }
};

module.exports = {
  getHabits,
  getHabit,
  createHabit,
  updateHabit,
  deleteHabit,
  completeHabit,
  getUserStats
};