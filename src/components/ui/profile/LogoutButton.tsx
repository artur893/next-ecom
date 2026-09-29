"use client";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="text-paragraph-m font-medium text-[#FCFCFC]"
    >
      Logout
    </button>
  );
}
