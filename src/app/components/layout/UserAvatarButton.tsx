"use client";
import { signOut } from "next-auth/react";

export default function UserAvatarButton({ initial }: { initial: string }) {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center text-neutral-900 text-xs font-semibold"
    >
      {initial}
    </button>
  );
}
