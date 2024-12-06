// src/App.js
import React from "react";
import { HashRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import AboutPage from "./pages/AboutPage";
import HealthDiaryPage from "./pages/HealthDiaryPage";
import Dashboard from "./pages/Dashboard";
import ChatPage from "./pages/ChatPage"; // Import the ChatPage component

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 flex flex-col">
      {/* Button Section */}
      <div className="flex flex-col sm:flex-row justify-center sm:justify-end p-6 space-y-4 sm:space-y-0 sm:space-x-4">
        <button
          className="w-full sm:w-auto bg-green-400 text-white py-2 px-6 rounded-full font-semibold hover:bg-green-500 transition transform hover:scale-105 shadow-md"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </button>
        <button
          className="w-full sm:w-auto bg-blue-400 text-white py-2 px-6 rounded-full font-semibold hover:bg-blue-500 transition transform hover:scale-110 shadow-md"
          onClick={() => navigate("/login")}
        >
          Log In
        </button>
        <button
          className="w-full sm:w-auto bg-yellow-400 text-white py-2 px-6 rounded-full font-semibold hover:bg-yellow-500 transition transform hover:scale-110 shadow-md"
          onClick={() => navigate("/about")}
        >
          About
        </button>
        <button
          className="w-full sm:w-auto bg-red-400 text-white py-2 px-6 rounded-full font-semibold hover:bg-red-500 transition transform hover:scale-110 shadow-md"
          onClick={() => navigate("/health-diary")}
        >
          Health Diary
        </button>
        <button
          className="w-full sm:w-auto bg-purple-400 text-white py-2 px-6 rounded-full font-semibold hover:bg-purple-500 transition transform hover:scale-110 shadow-md"
          onClick={() => navigate("/chat")}
        >
          Chat with GPT
        </button>
      </div>

      {/* Welcome Message Section */}
      <div className="flex-grow flex items-center justify-center">
        <h1 className="text-center text-4xl sm:text-5xl font-bold text-white">
          Welcome to TravelMedic
        </h1>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/health-diary" element={<HealthDiaryPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat" element={<ChatPage />} /> {/* Add route for ChatPage */}
      </Routes>
    </Router>
  );
}

export default App;
