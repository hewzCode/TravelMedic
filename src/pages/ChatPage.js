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

  // Scroll to the bottom of the chat container
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Dot animation for bot typing
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

  // Simulate typing word by word
  const simulateTyping = (text) => {
    let i = 0;
    const words = text.split(" ");
    stopTypingFlag.current = false;

    setMessages((prev) => [
      ...prev.slice(0, -1), // Replace the "dot" placeholder
      { role: "bot", content: "" },
    ]);

    const interval = setInterval(() => {
      if (stopTypingFlag.current || i >= words.length) {
        clearInterval(interval);
        setBotTyping(false);
        return;
      }

      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "bot", content: prev[prev.length - 1].content + (i > 0 ? " " : "") + words[i] },
      ]);
      i++;
    }, 100);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");
    setBotTyping(true);

    setMessages((prev) => [...prev, { role: "bot", content: "." }]);

    try {
      const responseText = await generateContent(input);
      simulateTyping(responseText || "No response text");
    } catch (error) {
      console.error("Error fetching API response:", error);
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "bot", content: "Sorry, something went wrong." },
      ]);
      setBotTyping(false);
    }
  };

  // Stop typing function
  const stopTyping = () => {
    stopTypingFlag.current = true; // Stop the typing simulation

    // Clear typing animation
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }

    // Stop bot typing and leave the current message as is
    setBotTyping(false);
  };

  // Handle Enter key press in input
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !botTyping) {
      e.preventDefault(); // Prevent default newline behavior
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-500 to-blue-600 flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold text-white mb-8">Chat with Gemini AI</h1>

      <div className="w-full max-w-lg bg-white p-4 rounded shadow-lg mb-8">
        <div
          ref={chatContainerRef}
          className="overflow-y-auto h-80 mb-4"
        >
          {messages.map((msg, index) => (
            <div key={index} className={`my-2 ${msg.role === "user" ? "text-right" : "text-left"}`}>
              <div
                className={`inline-block px-4 py-2 rounded-2xl ${
                  msg.role === "user" ? "bg-blue-400 text-white" : "bg-green-200 text-black"
                }`}
                style={{
                  maxWidth: "75%", // Limit width of chat bubbles
                  wordWrap: "break-word", // Ensure text wraps
                  overflowWrap: "break-word", // Handle long words
                  whiteSpace: "pre-wrap", // Preserve spaces and handle wrapping
                }}
              >
                {msg.content === "." ? dotAnimation : msg.content}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown} // Add keydown listener for Enter key
            placeholder="Type a message..."
            className="flex-grow px-4 py-2 border rounded-l focus:outline-none"
            disabled={botTyping} // Disable input while the bot is typing
          />
          {botTyping ? (
            <button
              onClick={stopTyping}
              className="bg-red-500 text-white px-4 py-2 rounded-r hover:bg-red-600 transition"
            >
              Stop
            </button>
          ) : (
            <button
              onClick={sendMessage}
              className="bg-green-500 text-white px-4 py-2 rounded-r hover:bg-green-600 transition"
            >
              Send
            </button>
          )}
        </div>
      </div>

      <button
        onClick={() => navigate("/")}
        className="bg-green-600 text-white py-3 px-8 rounded-full font-semibold hover:bg-green-700 transition transform hover:scale-105 shadow-md"
      >
        Back to Home
      </button>
    </div>
  );
}

export default ChatPage;
