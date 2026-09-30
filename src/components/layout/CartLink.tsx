"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { CartIcon } from "@/components/icons";
import { CART_CHANGED_EVENT, countCartItems } from "@/lib/cart";
import { CartItem } from "@/types/cart";

export default function CartLink({ initialCount }: { initialCount: number }) {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    async function refreshCount() {
      const response = await fetch("/api/cart");
      if (!response.ok) return;

      const items: CartItem[] = await response.json();
      setCount(countCartItems(items));
    }

    window.addEventListener(CART_CHANGED_EVENT, refreshCount);
    return () => window.removeEventListener(CART_CHANGED_EVENT, refreshCount);
  }, []);

  return (
    <Link
      href="/cart"
      aria-label={count > 0 ? `Cart, ${count} items` : "Cart"}
      className="relative mr-4 flex items-center justify-center md:mr-7"
    >
      <CartIcon className="text-neutral-100" />
      {count > 0 && (
        <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary-500 px-1 text-paragraph-xs leading-none font-semibold text-neutral-900">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}
