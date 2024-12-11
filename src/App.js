import React from "react";
import { HashRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import AboutPage from "./pages/AboutPage";
import HealthDiaryPage from "./pages/HealthDiaryPage";
import Dashboard from "./pages/Dashboard";
import ChatPage from "./pages/ChatPage";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-indigo-800 flex flex-col items-center px-6 sm:px-16 py-8">
      {/* Title Section */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
          Welcome to <br /> TravelMedic
        </h1>
      </div>

      {/* Button Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-3xl">
        <button
          className="w-full bg-green-400 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-green-500 transition transform hover:scale-105 shadow-lg"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </button>
        <button
          className="w-full bg-blue-400 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-blue-500 transition transform hover:scale-105 shadow-lg"
          onClick={() => navigate("/login")}
        >
          Log In
        </button>
        <button
          className="w-full bg-yellow-400 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-yellow-500 transition transform hover:scale-105 shadow-lg"
          onClick={() => navigate("/about")}
        >
          About
        </button>
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
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </Router>
  );
}

export default App;
