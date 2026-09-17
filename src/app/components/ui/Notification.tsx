"use client";
import { useEffect } from "react";
import { CheckCircleIcon, CloseIcon } from "@/app/components/icons";
import { useNotification } from "@/hooks/useNotification";

const typeStyles = {
  success: "bg-[#295B40] border-success-500 text-success-100",
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
          <CheckCircleIcon width={30} height={30} className="text-success-300" />
        )}
        <span className="text-heading-7-lg font-medium">
          {notification.message}
        </span>
      </div>
      <button type="button" onClick={clearNotification}>
        <CloseIcon width={30} height={30} />
      </button>
    </div>
  );
}
