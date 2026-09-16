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
    <Link
      href={`/product/${id}`}
      className="flex w-60 shrink-0 flex-col gap-4.5 rounded-md border border-gray-800 bg-neutral-900 pb-5 pl-4 pr-4 pt-4 min-[1120px]:w-68 xl:w-75"
    >
      <div className="relative h-51 w-full rounded-md bg-base-white">
        <button
          type="button"
          onClick={handleAddToCart}
          className="absolute left-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-base-white"
        >
          <CartIcon width={24} height={24} className="text-neutral-200" />
        </button>
        {image && (
          <Image
            src={image}
            alt={name}
            fill
            sizes="268px"
            className="object-contain p-6"
          />
        )}
      </div>
      <div>
        <span className="inline-block w-fit rounded-md bg-blaze-orange-600 px-2.5 py-1 text-paragraph-xs font-medium text-primary-100">
          {categoryName}
        </span>
        <h3 className="mt-4 text-paragraph-m">{name}</h3>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-xl font-semibold">${price.toFixed(2)}</span>
          {originalPrice && (
            <span className="text-paragraph-s text-neutral-400 line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
