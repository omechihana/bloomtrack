import React from 'react';
import { Link } from 'react-router-dom';

const HabitCard = ({ habit, onComplete, onDelete }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const isCompletedToday = habit.completedDates.some(dateObj => {
    const date = new Date(dateObj.date);
    return date.setHours(0, 0, 0, 0) === today.getTime();
  });

  const handleComplete = async (e) => {
    e.stopPropagation();
    await onComplete(habit._id);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this habit?')) {
      await onDelete(habit._id);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-800">{habit.title}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            habit.frequency === 'daily' 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-purple-100 text-purple-800'
          }`}>
            {habit.frequency}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4">{habit.description}</p>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500">
            Created: {formatDate(habit.createdAt)}
          </span>
          <span className="text-sm font-medium text-indigo-600">
            {habit.completedDates.length} completions
          </span>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={handleComplete}
            disabled={isCompletedToday}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              isCompletedToday
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            {isCompletedToday ? 'Completed ✓' : 'Mark Complete'}
          </button>
          
          <Link
            to={`/habits/edit/${habit._id}`}
            className="flex-1 py-2 px-4 bg-indigo-100 text-indigo-700 rounded-lg text-sm font-medium hover:bg-indigo-200 transition-colors text-center"
          >
            Edit
          </Link>
          
          <button
            onClick={handleDelete}
            className="py-2 px-3 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};

export default HabitCard;