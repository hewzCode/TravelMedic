// src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NotificationBell from './NotificationBell'; // Import NotificationBell component
import { useNotification } from './NotificationContext'; // Import Notification Context
import NotificationPopup from './NotificationPopup'; // Import the combined NotificationPopup

function Dashboard() {
  const navigate = useNavigate();
  const username = "User"; // Replace with dynamic user fetching logic if available
  const { notifications, setNotifications } = useNotification(); // Get notifications from the context
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Static notification to simulate health risk alert
  const staticNotification = { message: "New health risk detected nearby! Stay cautious." };

  useEffect(() => {
    // Check if the notification has already been shown in this session
    const hasShownNotification = sessionStorage.getItem("healthAlertShown");

    if (!hasShownNotification) {
      setNotifications([staticNotification]);
      setIsPopupVisible(true);
      sessionStorage.setItem("healthAlertShown", "true"); // Store that the alert has been shown
    }
  }, [setNotifications]);

  const handleBellClick = () => {
    // When bell icon is clicked, show the popup with the same notification
    setNotifications([staticNotification]);
    setIsPopupVisible(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="flex justify-between w-full max-w-sm">
        <h1 className="text-3xl sm:text-5xl font-bold text-white mb-8 text-center">
          Welcome, {username}!
        </h1>

        {/* Notification Bell Icon */}
        <div className="relative">
          <NotificationBell onClick={handleBellClick} />
          {notifications.length > 0 && (
            <div className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
              {notifications.length}
            </div>
          )}
        </div>
      </div>

      {/* Displaying the Notifications */}
      {notifications.length > 0 && (
        <div className="w-full max-w-sm mt-4">
          <ul>
            {notifications.map((notif, index) => (
              <li key={index} className="bg-gray-800 text-white p-3 rounded-lg mb-2">
                {notif.message}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Display Notification Popup */}
      {isPopupVisible && (
        <NotificationPopup 
          notifications={notifications}
          onClose={() => setIsPopupVisible(false)} // Close the popup when user dismisses it
        />
      )}

      {/* Container for the buttons */}
      <div className="space-y-4 w-full max-w-sm flex flex-col items-center">
        <button
          onClick={() => navigate("/health-diary")}
          className="w-full bg-purple-500 text-white py-3 px-6 rounded-lg font-semibold text-lg text-center hover:bg-purple-600 transition transform hover:scale-105 shadow-lg"
        >
          Go to Health Diary
        </button>

        <button
          onClick={() => navigate("/chat")}
          className="w-full bg-green-500 text-white py-3 px-6 rounded-lg font-semibold text-lg text-center hover:bg-green-600 transition transform hover:scale-105 shadow-lg"
        >
          Chat with GPT
        </button>

        <button
          onClick={() => navigate("/map")}
          className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold text-lg text-center hover:bg-blue-600 transition transform hover:scale-105 shadow-lg"
        >
          Maps
        </button>

        <button
          onClick={() => navigate("/")}
          className="w-full bg-red-500 text-white py-3 px-6 rounded-lg font-semibold text-lg text-center hover:bg-red-600 transition transform hover:scale-105 shadow-lg"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Dashboard;