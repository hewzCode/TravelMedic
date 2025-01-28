// src/pages/NotificationBell.js
import React from "react";

function NotificationBell({ onClick }) {
  return (
    <button onClick={onClick} className="relative bg-yellow-400 p-2 rounded-full">
      <span className="text-white">🔔</span> {/* Bell Icon */}
    </button>
  );
}

export default NotificationBell;