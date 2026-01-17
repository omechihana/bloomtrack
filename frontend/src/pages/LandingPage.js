import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-indigo-800 mb-6">
            BloomTrack
          </h1>
          <p className="text-2xl text-gray-700 mb-10">
            Build positive habits and track your progress toward a better you
          </p>
          
          <div className="mb-12">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80" 
              alt="Habit tracking visualization" 
              className="mx-auto rounded-lg shadow-xl w-full max-w-2xl"
            />
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-xl font-semibold mb-2">Start Small</h3>
              <p className="text-gray-600">Begin with simple, achievable habits that compound over time</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
              <p className="text-gray-600">Monitor your streaks and celebrate your achievements</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">🌸</div>
              <h3 className="text-xl font-semibold mb-2">Bloom Daily</h3>
              <p className="text-gray-600">Watch yourself grow with consistent daily practice</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/signup" 
              className="px-8 py-4 bg-indigo-600 text-white rounded-lg text-lg font-medium hover:bg-indigo-700 transition-colors shadow-lg"
            >
              Get Started
            </Link>
            <Link 
              to="/login" 
              className="px-8 py-4 bg-white text-indigo-600 rounded-lg text-lg font-medium border-2 border-indigo-600 hover:bg-indigo-50 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;