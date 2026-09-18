"use client";
import { useState } from "react";
import Button from "../basics/Button";
import {
  CartIcon,
  CheckIcon,
  MinusIcon,
  PlusIcon,
} from "@/app/components/icons";
import { useAddToCart } from "@/hooks/useAddToCart";

const COLORS = ["#FFFFFF", "#1C1C22"];

export default function ProductPurchasePanel({
  productId,
  price,
  stock,
}: {
  productId: number;
  price: number;
  stock: number;
}) {
  const [color, setColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const addToCart = useAddToCart();

  function decrement() {
    setQuantity((value) => Math.max(1, value - 1));
  }

  function increment() {
    setQuantity((value) => Math.min(stock, value + 1));
  }

  return (
    <div className="w-full shrink-0 rounded-md border border-gray-800 bg-neutral-900 p-6 md:max-w-90">
      <span className="text-paragraph-l font-medium text-neutral-300">
        Colors
      </span>
      <div className="mt-3 flex gap-3">
        {COLORS.map((hex, index) => (
          <button
            key={hex}
            type="button"
            onClick={() => setColor(index)}
            style={{ backgroundColor: hex }}
            className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-700"
          >
            {color === index && (
              <CheckIcon
                width={16}
                height={16}
                color={hex === "#FFFFFF" ? "#1C1C22" : "#FFFFFF"}
              />
            )}
          </button>
        ))}
      </div>

      <span className="mt-6 block text-paragraph-l font-medium text-neutral-300">
        Quantity
      </span>
      <div className="mt-3 flex items-center gap-4">
        <div className="flex items-center gap-4 rounded-md border border-[#FCFCFC] px-3 py-2 text-[#FCFCFC]">
          <button
            type="button"
            onClick={decrement}
            aria-label="Decrease quantity"
          >
            <MinusIcon width={24} height={24} />
          </button>
          <span className="w-6 text-center text-paragraph-m">{quantity}</span>
          <button
            type="button"
            onClick={increment}
            aria-label="Increase quantity"
          >
            <PlusIcon width={24} height={24} />
          </button>
        </div>
        <span className="text-paragraph-s text-[#FCFCFC]">Stock : {stock}</span>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div>
          <span className="block text-paragraph-l font-medium text-neutral-300">
            Subtotal
          </span>
          <span className="text-heading-6 font-medium text-[#FCFCFC]">
            ${(price * quantity).toFixed(2)}
          </span>
        </div>

        <Button
          variant="outline"
          size="xl"
          className="font-medium"
          rightIcon={<CartIcon width={20} height={20} />}
          onClick={() => addToCart(productId)}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
