// src/pages/NotificationPopup.js
import React from "react";

function NotificationPopup({ notifications, onClose }) {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h3 className="text-lg font-bold">New Notifications</h3>
        <ul>
          {notifications.map((notif, index) => (
            <li key={index} className="text-gray-800">
              {notif.message}
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white py-2 px-6 rounded-full"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}

export default NotificationPopup;