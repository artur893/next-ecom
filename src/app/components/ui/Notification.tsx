"use client";
import { useEffect } from "react";
import { CheckIcon, CloseIcon } from "../icons";
import { useNotification } from "../providers/NotificationProvider";

const typeStyles = {
  success: "bg-success-900 border-success-600 text-success-100",
  error: "bg-danger-900 border-danger-600 text-danger-100",
};

export default function Notification() {
  const { notification, clearNotification } = useNotification();

  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(clearNotification, 5000);
    return () => clearTimeout(timer);
  }, [notification, clearNotification]);

  if (!notification) return null;

  const Icon = notification.type === "success" ? CheckIcon : CloseIcon;

  return (
    <div
      className={`flex items-center justify-between gap-3 rounded-md border px-4 py-3 ${typeStyles[notification.type]}`}
    >
      <div className="flex items-center gap-3">
        <Icon width={20} height={20} />
        <span className="text-paragraph-s">{notification.message}</span>
      </div>
      <button type="button" onClick={clearNotification}>
        <CloseIcon width={18} height={18} />
      </button>
    </div>
  );
}
