import Link from "next/link";

export default function UserAvatarButton({ initial }: { initial: string }) {
  return (
    <Link
      href="/profile"
      aria-label="Go to profile"
      className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500 text-lg font-semibold text-neutral-900"
    >
      {initial}
    </Link>
  );
}
