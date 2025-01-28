// src/NotificationContext.js

import React, { createContext, useState, useContext } from "react";

// Create the Notification context
const NotificationContext = createContext();

// Custom hook to access notifications anywhere in the app
export function useNotification() {
  return useContext(NotificationContext);
}

// Provider component to wrap around your app and share notifications state
export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([
    { message: "New health risk detected nearby! Stay cautious." }, // Default static notification
  ]);

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
}