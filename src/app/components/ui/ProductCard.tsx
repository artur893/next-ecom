"use client";
import { MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { CartIcon } from "@/app/components/icons";
import { useAddToCart } from "./useAddToCart";

export interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  originalPrice?: number | null;
  categoryName: string;
  image?: string;
}

export default function ProductCard({
  id,
  name,
  price,
  originalPrice,
  categoryName,
  image,
}: ProductCardProps) {
  const addToCart = useAddToCart();

  function handleAddToCart(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    addToCart(id);
  }

  return (
    <Link href={`/product/${id}`} className="w-60 shrink-0">
      <div className="relative aspect-square rounded-md bg-base-white">
        <button
          type="button"
          onClick={handleAddToCart}
          className="absolute left-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-md bg-neutral-900 text-base-white"
        >
          <CartIcon width={18} height={18} />
        </button>
        {image && (
          <Image
            src={image}
            alt={name}
            fill
            sizes="240px"
            className="object-contain p-6"
          />
        )}
      </div>
      <span className="mt-3 inline-block rounded bg-primary-500 px-2 py-1 text-paragraph-xs font-medium text-neutral-900">
        {categoryName}
      </span>
      <h3 className="mt-2 text-paragraph-m">{name}</h3>
      <div className="mt-1 flex items-center gap-2">
        <span className="text-lg font-semibold">${price.toFixed(2)}</span>
        {originalPrice && (
          <span className="text-sm text-neutral-400 line-through">
            ${originalPrice.toFixed(2)}
          </span>
        )}
      </div>
    </Link>
  );
}
