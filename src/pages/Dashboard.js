// src/pages/Dashboard.js
import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const username = "User"; // Replace with dynamic user fetching logic if available

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold text-white mb-8">Welcome, {username}!</h1>
      <div className="space-y-4 w-full max-w-md flex flex-col items-center">
        {/* Navigate to Health Diary */}
        <button
          onClick={() => navigate("/health-diary")}
          className="w-full bg-purple-500 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-purple-600 transition transform hover:scale-105 shadow-lg"
        >
          Go to Health Diary
        </button>

        {/* Navigate to Chat with GPT */}
        <button
          onClick={() => navigate("/chat")}
          className="w-full bg-green-500 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-green-600 transition transform hover:scale-105 shadow-lg"
        >
          Chat with GPT
        </button>
        <button
          onClick={() => navigate("/map")}
          className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-blue-600 transition transform hover:scale-105 shadow-lg"
        >
          Maps
        </button>

        {/* Log Out */}
        <button
          onClick={() => navigate("/")}
          className="w-full bg-red-500 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-red-600 transition transform hover:scale-105 shadow-lg"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
