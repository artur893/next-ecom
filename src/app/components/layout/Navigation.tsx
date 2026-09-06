"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();
  return (
    <>
      <nav className="my-10 flex gap-12 font-semibold">
        <Link
          href={"/home"}
          className={pathname === "/home" ? "text-primary-500" : ""}
        >
          Home
        </Link>
        <Link href={"/product"}>Product</Link>
        <Link href={"/contact"}>Contact</Link>
      </nav>
      <div className="h-px w-full bg-neutral-700 mb-10"></div>
    </>
  );
}
