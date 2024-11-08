// src/pages/Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold text-white mb-8">Dashboard</h1>
      <div className="space-y-4">
        <button
          onClick={() => navigate('/health-diary')}
          className="dashboard-button bg-purple-600 text-white py-3 px-8 rounded-full font-semibold hover:bg-purple-700 transition transform hover:scale-105 shadow-md"
        >
          Go to Health Diary
        </button>
        <button
          onClick={() => navigate('/about')}
          className="dashboard-button bg-blue-500 text-white py-3 px-8 rounded-full font-semibold hover:bg-blue-600 transition transform hover:scale-105 shadow-md"
        >
          About Us
        </button>
        <button
          onClick={() => navigate('/')}
          className="dashboard-button bg-red-500 text-white py-3 px-8 rounded-full font-semibold hover:bg-red-600 transition transform hover:scale-105 shadow-md"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
