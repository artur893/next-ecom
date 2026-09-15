"use client";
import { createContext, useCallback, useContext, useState } from "react";

export type NotificationType = "success" | "error";

interface NotificationState {
  message: string;
  type: NotificationType;
}

interface NotificationContextValue {
  notification: NotificationState | null;
  showNotification: (message: string, type?: NotificationType) => void;
  clearNotification: () => void;
}

const NotificationContext = createContext<NotificationContextValue | null>(
  null,
);

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notification, setNotification] = useState<NotificationState | null>(
    null,
  );

  const showNotification = useCallback(
    (message: string, type: NotificationType = "success") => {
      setNotification({ message, type });
    },
    [],
  );

  const clearNotification = useCallback(() => setNotification(null), []);

  return (
    <NotificationContext.Provider
      value={{ notification, showNotification, clearNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider",
    );
  }
  return context;
}
