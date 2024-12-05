// src/pages/LoginPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // To navigate after successful login
import { handleLogin } from "../LoginModal"; // Import the handleLogin function you created for Firebase

function LoginPage() {
  const navigate = useNavigate(); // To navigate after login
  const [email, setEmail] = useState(""); // State to store email
  const [password, setPassword] = useState(""); // State to store password
  const [error, setError] = useState(""); // State to store error messages

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Clear any existing error messages

    // Call Firebase login function
    handleLogin(email, password)
      .then(() => {
        // On successful login, redirect to the HomePage or Dashboard
        navigate("/"); // You can redirect to any page you want after login
      })
      .catch((error) => {
        setError(error.message); // Set error message if login fails
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 flex flex-col items-center justify-center">
      <h1 className="text-3xl text-white mb-6">Login</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-80">
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mt-1 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mt-1 border border-gray-300 rounded-md"
            required
          />
        </div>
        {error && <p className="text-red-500 text-xs mb-4">{error}</p>} {/* Display error message */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
