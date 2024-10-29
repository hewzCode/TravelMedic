import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 flex flex-col">
      {/* Navbar with buttons in the top-right */}
      <div className="flex justify-end p-6 space-x-4">
        {/* Sign Up Button */}
        <button className="bg-green-400 text-white py-2 px-6 rounded-full font-semibold hover:bg-green-500 transition shadow-md">
          Sign Up
        </button>

        {/* Login Button */}
        <button className="bg-blue-400 text-white py-2 px-6 rounded-full font-semibold hover:bg-blue-500 transition shadow-md">
          Login
        </button>

        {/* Additional Option: About */}
        <button className="bg-yellow-400 text-white py-2 px-6 rounded-full font-semibold hover:bg-yellow-500 transition shadow-md">
          About
        </button>

        {/* Additional Option: Contact */}
        <button className="bg-red-400 text-white py-2 px-6 rounded-full font-semibold hover:bg-red-500 transition shadow-md">
          Contact
        </button>
      </div>

      {/* Title in the center */}
      <div className="flex-grow flex items-center justify-center">
        <h1 className="text-5xl font-bold text-white">TravelMedic</h1>
      </div>
    </div>
  );
}

export default App;
