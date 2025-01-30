import React from "react";
import { HashRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import AboutPage from "./pages/AboutPage";
import HealthDiaryPage from "./pages/HealthDiaryPage";
import Dashboard from "./pages/Dashboard";
import ChatPage from "./pages/ChatPage";
import MapPage from "./pages/MapPage";
import NotificationPopup from "./pages/NotificationPopup";
import { NotificationProvider } from "./pages/NotificationContext";
import NotificationBell from "./pages/NotificationBell";
import "./App.css";

function HomePage() {
  const navigate = useNavigate();

  return (
    <header className="bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-[#f8fafc] min-h-screen flex flex-col items-center justify-center text-center">
      {/* Header Section */}
      <h1 className="text-5xl font-bold mb-8 hover:text-[#d1fae5] transition duration-300">
        Welcome to TravelMedic!
      </h1>

      {/* Buttons Section */}
      <div className="flex gap-6 mt-8 justify-center">
        <button
          onClick={() => navigate("/signup")}
          className="bg-[#10b981] text-white px-6 py-3 text-xl rounded-lg hover:bg-[#059669] transition duration-300"
        >
          Sign Up
        </button>
        <button
          onClick={() => navigate("/login")}
          className="bg-[#10b981] text-white px-6 py-3 text-xl rounded-lg hover:bg-[#059669] transition duration-300"
        >
          Log In
        </button>
        <button
          onClick={() => navigate("/about")}
          className="bg-[#10b981] text-white px-6 py-3 text-xl rounded-lg hover:bg-[#059669] transition duration-300"
        >
          About
        </button>
      </div>

      {/* Content Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-8 text-[#d1fae5]">
          Why Choose TravelMedic?
        </h2>
        <div className="flex flex-wrap justify-around gap-6">
          <div className="bg-[#1e293b] text-[#f8fafc] p-6 rounded-lg w-72 shadow-lg">
            <h3 className="text-2xl mb-4 text-[#10b981]">Global Medical Access</h3>
            <p className="text-[#e5e5e5]">
              Find trusted medical services wherever you travel.
            </p>
          </div>
          <div className="bg-[#1e293b] text-[#f8fafc] p-6 rounded-lg w-72 shadow-lg">
            <h3 className="text-2xl mb-4 text-[#10b981]">AI-Powered Assistance</h3>
            <p className="text-[#e5e5e5]">
              Get 24/7 help with finding medical facilities, health questions, or
              emergency guidance from our smart chatbot.
            </p>
          </div>
          <div className="bg-[#1e293b] text-[#f8fafc] p-6 rounded-lg w-72 shadow-lg">
            <h3 className="text-2xl mb-4 text-[#10b981]">Find Care Near You</h3>
            <p className="text-[#e5e5e5]">
              Use our Google Maps integration to locate nearby hospitals, clinics,
              and pharmacies quickly.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="mt-16 p-4 bg-[#1e293b] text-[#f8fafc] w-full text-center">
        <p>&copy; 2025 TravelMedic. All rights reserved.</p>
      </footer>
    </header>
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
        <Route path="/map" element={<MapPage />} />
        <Route path="/notification" element={<NotificationPopup />} />
      </Routes>
    </Router>
  );
}

export default App;