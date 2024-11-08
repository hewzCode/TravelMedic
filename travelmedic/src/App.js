// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import AboutPage from './pages/AboutPage';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 flex flex-col">
      <div className="flex justify-end p-6 space-x-4">
        <button
          className="bg-green-400 text-white py-2 px-6 rounded-full font-semibold hover:bg-green-500 transition transform hover:scale-105 shadow-md animate-bounce"
          onClick={() => navigate('/signup')}
        >
          Sign Up
        </button>
        <button
          className="bg-blue-400 text-white py-2 px-6 rounded-full font-semibold hover:bg-blue-500 transition transform hover:scale-110 shadow-md"
          onClick={() => navigate('/login')}
        >
          Log In
        </button>
        <button
          className="bg-yellow-400 text-white py-2 px-6 rounded-full font-semibold hover:bg-yellow-500 transition transform hover:scale-110 shadow-md"
          onClick={() => navigate('/about')}
        >
          About
        </button>
      </div>
      <div className="flex-grow flex items-center justify-center">
        <h1 className="text-5xl font-bold text-white">Welcome to TravelMedic</h1>
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
      </Routes>
    </Router>
  );
}

export default App;
