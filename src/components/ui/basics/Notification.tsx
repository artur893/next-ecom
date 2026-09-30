"use client";
import { useEffect } from "react";
import { CheckCircleIcon, CloseIcon } from "@/components/icons";
import { useNotification } from "@/hooks/useNotification";

const typeStyles = {
  success: "bg-success-750 border-success-500 text-success-100",
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

  return (
    <div
      className={`flex items-center justify-between gap-3 rounded-md border px-4 py-3 mb-5 ${typeStyles[notification.type]}`}
    >
      <div className="flex items-center gap-3">
        {notification.type === "success" && (
          <CheckCircleIcon className="size-5 shrink-0 text-success-300 md:size-7.5" />
        )}
        <span className="text-paragraph-s font-medium md:text-heading-7-lg">
          {notification.message}
        </span>
      </div>
      <button type="button" onClick={clearNotification}>
        <CloseIcon className="size-5 md:size-7.5" />
      </button>
    </div>
  );
}
