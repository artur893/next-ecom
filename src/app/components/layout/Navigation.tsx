"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/home", label: "Home" },
  { href: "/product", label: "Product" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const pathname = usePathname();
  return (
    <>
      <nav className="my-10 flex gap-12 text-paragraph-m font-semibold">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={
              pathname === href
                ? "text-primary-500"
                : "hover:text-primary-500 transition-colors duration-200"
            }
          >
            {label}
          </Link>
        ))}
      </nav>
      <div className="h-px w-full bg-neutral-700 mb-10"></div>
    </>
  );
}
