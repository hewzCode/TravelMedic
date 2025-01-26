// src/pages/Dashboard.js

import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const username = "User"; // Replace with dynamic user fetching logic if available

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 flex flex-col items-center justify-center p-4">
      {/* Responsive text size: 3xl on mobile, 5xl on small screens and up */}
      <h1 className="text-3xl sm:text-5xl font-bold text-white mb-8 text-center">
        Welcome, {username}!
      </h1>

      {/* Container for the buttons */}
      <div className="space-y-4 w-full max-w-sm flex flex-col items-center">
        {/* Health Diary button */}
        <button
          onClick={() => navigate("/health-diary")}
          className="w-full bg-purple-500 text-white py-3 px-6 rounded-lg font-semibold text-lg text-center hover:bg-purple-600 transition transform hover:scale-105 shadow-lg"
        >
          Go to Health Diary
        </button>

        {/* Chat with GPT */}
        <button
          onClick={() => navigate("/chat")}
          className="w-full bg-green-500 text-white py-3 px-6 rounded-lg font-semibold text-lg text-center hover:bg-green-600 transition transform hover:scale-105 shadow-lg"
        >
          Chat with GPT
        </button>

        {/* Maps */}
        <button
          onClick={() => navigate("/map")}
          className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold text-lg text-center hover:bg-blue-600 transition transform hover:scale-105 shadow-lg"
        >
          Maps
        </button>

        {/* Log Out */}
        <button
          onClick={() => navigate("/")}
          className="w-full bg-red-500 text-white py-3 px-6 rounded-lg font-semibold text-lg text-center hover:bg-red-600 transition transform hover:scale-105 shadow-lg"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
