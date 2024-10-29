import React, { useState } from 'react';
import SignupModal from './SignupModal';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 flex flex-col">
      {/* Navbar with animated buttons in the top-right */}
      <div className="flex justify-end p-6 space-x-4">
        {/* Sign Up Button with bounce animation */}
        <button
          className="bg-green-400 text-white py-2 px-6 rounded-full font-semibold hover:bg-green-500 transition transform hover:scale-105 shadow-md animate-bounce"
          onClick={openModal}
        >
          Sign Up
        </button>

        {/* Other buttons */}
        <button className="bg-blue-400 text-white py-2 px-6 rounded-full font-semibold hover:bg-blue-500 transition transform hover:scale-110 shadow-md">
          Login
        </button>
        <button className="bg-yellow-400 text-white py-2 px-6 rounded-full font-semibold hover:bg-yellow-500 transition transform hover:rotate-180 hover:scale-105 shadow-md">
          About
        </button>
        <button className="bg-red-400 text-white py-2 px-6 rounded-full font-semibold hover:bg-red-500 transition transform hover:scale-125 shadow-md hover:skew-y-6">
          Contact
        </button>
      </div>

      {/* Title in the center */}
      <div className="flex-grow flex items-center justify-center">
        <h1 className="text-5xl font-bold text-white">TravelMedic</h1>
      </div>

      {/* Modal */}
      <SignupModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default App;
