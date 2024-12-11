import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import generateContent from "../lib/gemini";

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [dotAnimation, setDotAnimation] = useState("");
  const [botTyping, setBotTyping] = useState(false);
  const typingIntervalRef = useRef(null);
  const stopTypingFlag = useRef(false);
  const chatContainerRef = useRef(null);

  const navigate = useNavigate();

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    let dotCount = 1;
    if (botTyping) {
      typingIntervalRef.current = setInterval(() => {
        setDotAnimation(".".repeat(dotCount));
        dotCount = (dotCount % 3) + 1;
      }, 500);
    }

    return () => {
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    };
  }, [botTyping]);

  const simulateTyping = (text) => {
    let i = 0;
    const words = text.split(" ");
    stopTypingFlag.current = false;

    setMessages((prev) => [
      ...prev.slice(0, -1),
      { role: "bot", content: "", timestamp: new Date().toLocaleTimeString() },
    ]);

    const interval = setInterval(() => {
      if (stopTypingFlag.current || i >= words.length) {
        clearInterval(interval);
        setBotTyping(false);
        return;
      }

      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          role: "bot",
          content: prev[prev.length - 1].content + (i > 0 ? " " : "") + words[i],
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
      i++;
    }, 100);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", content: input, timestamp: new Date().toLocaleTimeString() },
    ]);
    setInput("");
    setBotTyping(true);

    setMessages((prev) => [
      ...prev,
      { role: "bot", content: ".", timestamp: new Date().toLocaleTimeString() },
    ]);

    try {
      const responseText = await generateContent(input);
      simulateTyping(responseText || "No response text");
    } catch (error) {
      console.error("Error fetching API response:", error);
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          role: "bot",
          content: "Sorry, something went wrong.",
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
      setBotTyping(false);
    }
  };

  const stopTyping = () => {
    stopTypingFlag.current = true;
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }
    setBotTyping(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !botTyping) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-500 to-blue-600 flex flex-col items-center justify-start px-4 sm:px-8 py-4">
      <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4 sm:mb-8 text-center">
        Chat with Gemini AI
      </h1>

      <div className="w-full max-w-lg bg-white p-4 sm:p-6 rounded-lg shadow-lg flex flex-col justify-between">
        <div
          ref={chatContainerRef}
          className="overflow-y-auto h-[60vh] sm:h-96 mb-4 p-2 border border-gray-200 rounded-lg"
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`my-4 ${
                msg.role === "user" ? "text-right" : "text-left"
              } group relative`}
            >
              <div
                className={`inline-block px-4 py-2 rounded-2xl transition-transform duration-300 ${
                  msg.role === "user"
                    ? "bg-blue-400 text-white hover:bg-blue-500 hover:scale-105"
                    : "bg-green-200 text-black hover:bg-green-300 hover:scale-105"
                }`}
                style={{
                  maxWidth: "75%",
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                  whiteSpace: "pre-wrap",
                  marginBottom: "20px", // Ensure spacing for timestamp
                  boxShadow: msg.role === "user" ? "0 4px 6px rgba(0, 0, 255, 0.2)" : "0 4px 6px rgba(0, 255, 0, 0.2)",
                }}
              >
                {msg.content === "." ? dotAnimation : msg.content}
              </div>
              <div
                className="text-xs text-gray-500 mt-2"
                style={{
                  marginTop: "-10px",
                }}
              >
                {msg.role === "user" ? "You | " : "Bot | "}
                {msg.timestamp}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={botTyping}
          />
          {botTyping ? (
            <button
              onClick={stopTyping}
              className="bg-red-500 text-white px-4 py-2 rounded-r-lg hover:bg-red-600 transition"
            >
              Stop
            </button>
          ) : (
            <button
              onClick={sendMessage}
              className="bg-green-500 text-white px-4 py-2 rounded-r-lg hover:bg-green-600 transition"
            >
              Send
            </button>
          )}
        </div>
      </div>

      <button
        onClick={() => navigate("/")}
        className="bg-green-600 text-white py-3 px-6 sm:px-8 rounded-full font-semibold mt-6 hover:bg-green-700 transition transform hover:scale-105 shadow-md"
      >
        Back to Home
      </button>
    </div>
  );
}

export default ChatPage;
