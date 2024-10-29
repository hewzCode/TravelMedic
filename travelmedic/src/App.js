import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600">
    {/* Title */}
    <h1 className="text-5xl font-bold text-white mb-12">TravelMedic</h1>

    {/* Buttons Container */}
    <div className="flex space-x-6">
      {/* Sign Up Button */}
      <button className="bg-green-400 text-white py-3 px-8 rounded-full font-semibold hover:bg-green-500 transition shadow-lg">
        Sign Up
      </button>

      {/* Login Button */}
      <button className="bg-blue-400 text-white py-3 px-8 rounded-full font-semibold hover:bg-blue-500 transition shadow-lg">
        Login
      </button>
    </div>
  </div>
  );
}

export default App;
