import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State for error message
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setError(''); // Clear any previous error
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard'); // Redirect to the dashboard on success
    } catch (error) {
      setError(error.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="bg-[#1e293b] min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Log In</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm">
              {error} {/* Display error message */}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-[#10b981] text-white py-2 px-4 rounded-md hover:bg-[#059669] transition"
          >
            Log In
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{' '}
          <Link to="/signup" className="text-[#10b981] hover:underline"> 
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;