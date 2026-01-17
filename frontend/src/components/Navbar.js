import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/dashboard" className="text-xl font-bold flex items-center">
            <span className="mr-2">🌸</span>
            BloomTrack
          </Link>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="hidden md:inline">Welcome, {user.name}</span>
                <Link 
                  to="/dashboard" 
                  className="px-3 py-2 rounded hover:bg-indigo-700 transition-colors"
                >
                  Dashboard
                </Link>
                <Link 
                  to="/habits/new" 
                  className="px-3 py-2 rounded bg-green-500 hover:bg-green-600 transition-colors"
                >
                  + New Habit
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded hover:bg-red-500 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="px-3 py-2 rounded hover:bg-indigo-700 transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="px-3 py-2 rounded bg-green-500 hover:bg-green-600 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;