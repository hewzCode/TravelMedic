import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NotificationBell from './NotificationBell'; // Import NotificationBell component
import { useNotification } from './NotificationContext'; // Import Notification Context
import NotificationPopup from './NotificationPopup'; // Import the combined NotificationPopup
import { FaHeartbeat, FaComment, FaMapMarkerAlt, FaSignOutAlt } from 'react-icons/fa'; // Import icons

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
    <div className="min-h-screen bg-[#1e293b] flex justify-center items-center py-10"> {/* Dark blue background */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        {/* Header */}
        <div className="flex justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex-grow text-center">Welcome!</h1>
          {/* Notification Bell Icon */}
          <div className="relative cursor-pointer" onClick={handleBellClick}>
            <NotificationBell />
            {notifications.length > 0 && (
              <div className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                {notifications.length}
              </div>
            )}
          </div>
        </div>

        {/* Display Notifications */}
        {notifications.length > 0 && (
          <div className="w-full max-w-sm mt-4">
            <ul>
              {notifications.map((notif, index) => (
                <li key={index} className="bg-[#f87171] text-white p-3 rounded-lg mb-2">
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

        {/* Buttons Section */}
        <div className="space-y-4 mt-8">
          <button
            onClick={() => navigate("/health-diary")}
            className="w-full bg-[#10b981] text-white py-3 px-6 rounded-lg font-semibold text-lg text-center hover:bg-[#059669] transition transform hover:scale-105 shadow-lg flex items-center justify-center"
          >
            <FaHeartbeat className="mr-3 text-white opacity-70" /> {/* Heartbeat Icon */}
            Go to Health Diary
          </button>

          <button
            onClick={() => navigate("/chat")}
            className="w-full bg-[#10b981] text-white py-3 px-6 rounded-lg font-semibold text-lg text-center hover:bg-[#059669] transition transform hover:scale-105 shadow-lg flex items-center justify-center"
          >
            <FaComment className="mr-3 text-white opacity-70" /> {/* Chat Icon */}
            Chat with TravelMedic
          </button>

          <button
            onClick={() => navigate("/map")}
            className="w-full bg-[#10b981] text-white py-3 px-6 rounded-lg font-semibold text-lg text-center hover:bg-[#059669] transition transform hover:scale-105 shadow-lg flex items-center justify-center"
          >
            <FaMapMarkerAlt className="mr-3 text-white opacity-70" /> {/* Map Icon */}
            Maps
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full bg-[#10b981] text-white py-3 px-6 rounded-lg font-semibold text-lg text-center hover:bg-[#059669] transition transform hover:scale-105 shadow-lg flex items-center justify-center"
          >
            <FaSignOutAlt className="mr-3 text-white opacity-70" /> {/* Sign-out Icon */}
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;