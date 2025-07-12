import { useState, useCallback, useEffect } from "react";

type NotificationType = "success" | "error" | "info" | "warning";

interface Notification {
  id: string;
  message: string;
  type: NotificationType;
  duration?: number;
}

export const useNotification = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentNotification, setCurrentNotification] =
    useState<Notification | null>(null);

  const showNotification = useCallback(
    (message: string, type: NotificationType = "info", duration = 3000) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newNotification = { id, message, type, duration };

      setNotifications((prev) => [...prev, newNotification]);
    },
    []
  );

  useEffect(() => {
    if (notifications.length > 0 && !currentNotification) {
      // Set the current notification to the first in queue
      setCurrentNotification(notifications[0]);
      // Remove it from queue after duration
      const timer = setTimeout(() => {
        setCurrentNotification(null);
        setNotifications((prev) => prev.slice(1));
      }, notifications[0].duration);

      return () => clearTimeout(timer);
    }
  }, [notifications, currentNotification]);

  return {
    currentNotification,
    showNotification,
  };
};

export const Notification = () => {
  const { currentNotification } = useNotification();

  if (!currentNotification) return null;

  const bgColor = {
    success: "#4caf50",
    error: "#f44336",
    info: "#2196f3",
    warning: "#ff9800",
  }[currentNotification.type];

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        padding: "15px 25px",
        backgroundColor: bgColor,
        color: "white",
        borderRadius: "4px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        zIndex: 1000,
        animation: "fadeIn 0.3s",
      }}
    >
      {currentNotification.message}
    </div>
  );
};
