"use client";
import { ReactNode, useState } from "react";
import { CartItem } from "@/lib/types/cart";
import { useUpdateCartItemQuantity } from "@/hooks/useUpdateCartItemQuantity";
import OrderItemCard from "./OrderItemCard";
import OrderSummary from "./OrderSummary";

const PRODUCT_PROTECTION_PRICE = 1;
const SHIPPING_PRICE = 5;
const SHIPPING_INSURANCE = 6;
const SERVICE_FEES = 0.5;

export default function CheckoutView({
  items: initialItems,
  children,
}: {
  items: CartItem[];
  children: ReactNode;
}) {
  const [items, setItems] = useState(initialItems);
  const [protectedIds, setProtectedIds] = useState<Set<number>>(
    new Set(initialItems.map((item) => item.id)),
  );
  const updateQuantity = useUpdateCartItemQuantity();

  async function handleQuantityChange(id: number, quantity: number) {
    const previous = items.find((item) => item.id === id)?.quantity;

    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );

    const ok = await updateQuantity(id, quantity);
    if (!ok && previous !== undefined) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: previous } : item,
        ),
      );
    }
  }

  function toggleProtection(id: number) {
    setProtectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const productTotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const productProtection = protectedIds.size * PRODUCT_PROTECTION_PRICE;
  const grandTotal =
    productTotal +
    productProtection +
    SHIPPING_PRICE +
    SHIPPING_INSURANCE +
    SERVICE_FEES;

  return (
    <div className="mt-6 flex flex-col gap-8 xl:flex-row xl:items-start">
      <div className="min-w-0 flex-1">
        <h1 className="text-heading-6 font-medium text-[#FCFCFC]">
          Your Order
        </h1>
        <div className="mt-4 flex flex-col gap-6">
          {items.map((item) => (
            <OrderItemCard
              key={item.id}
              item={item}
              protectionPrice={PRODUCT_PROTECTION_PRICE}
              protectionEnabled={protectedIds.has(item.id)}
              onToggleProtection={() => toggleProtection(item.id)}
              onQuantityChange={(quantity) =>
                handleQuantityChange(item.id, quantity)
              }
            />
          ))}
        </div>

        {children}
      </div>

      <OrderSummary
        itemCount={itemCount}
        productPrice={productTotal}
        productProtection={productProtection}
        shippingPrice={SHIPPING_PRICE}
        shippingInsurance={SHIPPING_INSURANCE}
        serviceFees={SERVICE_FEES}
        grandTotal={grandTotal}
      />
    </div>
  );
}
