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
    <div className="min-h-screen bg-[#1e293b] flex justify-center items-center py-10">
      <div className="w-full max-w-lg bg-white p-4 sm:p-6 rounded-lg shadow-lg flex flex-col justify-between">
        <h1 className="text-3xl sm:text-5xl font-bold text-black mb-4 sm:mb-8 text-center">
          Chat with TravelMedicAI
        </h1>

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
                    ? "bg-[#10b981] text-white hover:bg-[#059669] hover:scale-105"
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
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#10b981]"
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
              className="bg-[#10b981] text-white px-4 py-2 rounded-r-lg hover:bg-[#059669] transition"
            >
              Send
            </button>
          )}
        </div>

        {/* Return to Dashboard Button */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-[#10b981] text-white py-3 px-6 sm:px-8 rounded-full font-semibold hover:bg-[#059669] transition transform hover:scale-105 shadow-md"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;