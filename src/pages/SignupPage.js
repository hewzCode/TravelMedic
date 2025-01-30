import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      setError('');
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/login');
    } catch (error) {
      setError(error.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="bg-[#1e293b] min-h-screen flex justify-center items-center"> {/* Navy blue background */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Sign Up</h2>
        <form onSubmit={handleSignup} className="space-y-4">
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
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-[#10b981] text-white py-2 px-4 rounded-md hover:bg-[#059669] transition"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-[#10b981] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;