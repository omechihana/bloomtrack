import React from 'react';

const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${color.replace('bg-', 'border-')}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className="text-4xl opacity-70">{icon}</div>
      </div>
    </div>
  );
};

export default StatCard;