// src/pages/AboutPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold text-white mb-8">About Us</h1>
      <p className="text-center text-white max-w-lg mb-8 px-4">
        Welcome to TravelMedic! Our mission is to make healthcare resources more accessible and
        streamlined for everyone. We believe in empowering individuals to take control of their
        health with easy-to-use digital tools. Whether you’re managing medications, tracking
        symptoms, or keeping up with doctor’s appointments, we’re here to support you on your journey.
      </p>
      <button
        onClick={() => navigate('/')}
        className="bg-purple-600 text-white py-3 px-8 rounded-full font-semibold hover:bg-purple-700 transition transform hover:scale-105 shadow-md"
      >
        Back to Home
      </button>
    </div>
  );
}

export default AboutPage;
