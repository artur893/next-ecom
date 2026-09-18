"use client";
import { useState } from "react";
import { CheckIcon, MinusIcon, PlusIcon } from "@/app/components/icons";
import { CartItem } from "@/lib/types/cart";
import ProductImageFrame from "../product/ProductImageFrame";

export default function OrderItemCard({
  item,
  protectionPrice,
}: {
  item: CartItem;
  protectionPrice: number;
}) {
  const [quantity, setQuantity] = useState(item.quantity);
  const [protectionEnabled, setProtectionEnabled] = useState(true);

  return (
    <div className="rounded-md border border-gray-800 bg-neutral-900">
      <div className="flex flex-col items-center gap-4 p-6 sm:flex-row sm:items-start">
        <ProductImageFrame
          src={item.product.images[0]}
          alt={item.product.name}
          sizes="172px"
          className="h-34.5 w-43 shrink-0"
          innerClassName="p-2"
        />

        <div className="min-w-0 flex-1">
          <p className="text-heading-7 font-medium text-[#FCFCFC]">
            {item.product.name}
          </p>
          <span className="mt-2 inline-block rounded bg-primary-500 px-2 py-1 text-paragraph-s font-medium text-primary-100">
            {item.product.category.name}
          </span>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <p className="text-heading-6 font-medium text-[#FCFCFC]">
              ${item.product.price.toFixed(2)}
            </p>
            <div className="flex items-center gap-6">
              <button
                type="button"
                className="text-paragraph-m font-medium text-primary-500"
              >
                Write Note
              </button>
              <span className="h-6 w-px bg-gray-700" />
              <div className="flex items-center gap-4 rounded-md border border-[#FCFCFC] px-3 py-2 text-[#FCFCFC]">
                <button
                  type="button"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  aria-label="Decrease quantity"
                >
                  <MinusIcon width={16} height={16} />
                </button>
                <span className="w-6 text-center text-paragraph-m">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((value) => value + 1)}
                  aria-label="Increase quantity"
                >
                  <PlusIcon width={16} height={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-3 border-t border-gray-800 p-6">
        <button
          type="button"
          onClick={() => setProtectionEnabled((value) => !value)}
          aria-label="Toggle product protection"
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
            protectionEnabled
              ? "border-primary-500 bg-primary-500"
              : "border-gray-700"
          }`}
        >
          {protectionEnabled && (
            <CheckIcon width={14} height={14} className="text-neutral-900" />
          )}
        </button>
        <div className="min-w-0 flex-1">
          <p className="text-paragraph-m font-medium text-[#FCFCFC]">
            Product Protection
          </p>
          <p className="text-paragraph-s text-neutral-400">
            The claim process is easy and instant, valid for 6 months
          </p>
        </div>
        <span className="text-paragraph-m font-medium text-[#FCFCFC]">
          ${protectionPrice.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
