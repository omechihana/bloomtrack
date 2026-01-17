import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import habitService from '../services/habitService';
import quoteService from '../services/quoteService';
import StatCard from '../components/StatCard';
import HabitCard from '../components/HabitCard';

const DashboardPage = () => {
  const [habits, setHabits] = useState([]);
  const [stats, setStats] = useState({
    totalHabits: 0,
    completedToday: 0,
    activeStreak: 0,
    completionRate: 0
  });
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [habitsData, statsData, quoteData] = await Promise.all([
          habitService.getHabits(),
          habitService.getUserStats(),
          quoteService.getRandomQuote()
        ]);

        setHabits(habitsData);
        setStats(statsData);
        setQuote(quoteData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCompleteHabit = async (habitId) => {
    try {
      await habitService.completeHabit(habitId);
      // Refresh data after completion
      const [habitsData, statsData] = await Promise.all([
        habitService.getHabits(),
        habitService.getUserStats()
      ]);
      setHabits(habitsData);
      setStats(statsData);
    } catch (error) {
      console.error('Error completing habit:', error);
    }
  };

  const handleDeleteHabit = async (habitId) => {
    try {
      await habitService.deleteHabit(habitId);
      // Refresh data after deletion
      const [habitsData, statsData] = await Promise.all([
        habitService.getHabits(),
        habitService.getUserStats()
      ]);
      setHabits(habitsData);
      setStats(statsData);
    } catch (error) {
      console.error('Error deleting habit:', error);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="text-2xl">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">Track your habits and progress</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Habits" 
          value={stats.totalHabits} 
          icon="🎯" 
          color="bg-blue-500"
        />
        <StatCard 
          title="Completed Today" 
          value={stats.completedToday} 
          icon="✅" 
          color="bg-green-500"
        />
        <StatCard 
          title="Active Streak" 
          value={stats.activeStreak} 
          icon="🔥" 
          color="bg-orange-500"
        />
        <StatCard 
          title="Completion Rate" 
          value={`${stats.completionRate}%`} 
          icon="📊" 
          color="bg-purple-500"
        />
      </div>

      {/* Motivational Quote */}
      {quote && (
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg p-6 mb-8">
          <div className="text-xl italic mb-2">"{quote.content}"</div>
          <div className="text-right">— {quote.author}</div>
        </div>
      )}

      {/* Habits Section */}
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Your Habits</h2>
        <button
          onClick={() => navigate('/habits/new')}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          + Add New Habit
        </button>
      </div>

      {habits.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="text-6xl mb-4">🌱</div>
          <h3 className="text-xl font-semibold mb-2">No habits yet</h3>
          <p className="text-gray-600 mb-4">Start building positive habits today!</p>
          <button
            onClick={() => navigate('/habits/new')}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Create Your First Habit
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {habits.map(habit => (
            <HabitCard 
              key={habit._id} 
              habit={habit} 
              onComplete={handleCompleteHabit}
              onDelete={handleDeleteHabit}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;