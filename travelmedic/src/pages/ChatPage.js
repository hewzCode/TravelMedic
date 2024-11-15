// src/pages/ChatPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  // Function to handle sending a message locally (no API call)
  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-500 to-blue-600 flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold text-white mb-8">Chat with Claude</h1>

      <div className="w-full max-w-lg bg-white p-4 rounded shadow-lg mb-8">
        <div className="overflow-y-auto h-80 mb-4">
          {messages.map((msg, index) => (
            <div key={index} className={`my-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
              <span className={`inline-block px-4 py-2 rounded-full ${msg.role === 'user' ? 'bg-purple-200' : 'bg-gray-300'}`}>
                {msg.content}
              </span>
            </div>
          ))}
        </div>

        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-grow px-4 py-2 border rounded-l focus:outline-none"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 transition"
          >
            Send
          </button>
        </div>
      </div>

      <button
        onClick={() => navigate('/')}
        className="bg-green-600 text-white py-3 px-8 rounded-full font-semibold hover:bg-green-700 transition transform hover:scale-105 shadow-md"
      >
        Back to Home
      </button>
    </div>
  );
}

export default ChatPage;
