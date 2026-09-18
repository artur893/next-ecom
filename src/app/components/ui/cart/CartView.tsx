"use client";
import { useState } from "react";
import { CartItem } from "@/lib/types/cart";
import { useUpdateCartItemQuantity } from "@/hooks/useUpdateCartItemQuantity";
import { useRemoveCartItem } from "@/hooks/useRemoveCartItem";
import Checkbox from "../basics/Checkbox";
import CartItemRow from "./CartItemRow";
import CartSummary from "./CartSummary";

export default function CartView({ items: initialItems }: { items: CartItem[] }) {
  const [items, setItems] = useState(initialItems);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(
    new Set(initialItems.map((item) => item.id)),
  );
  const updateQuantity = useUpdateCartItemQuantity();
  const removeCartItem = useRemoveCartItem();

  const allSelected = selectedIds.size === items.length && items.length > 0;

  function toggleSelectAll() {
    setSelectedIds(
      allSelected ? new Set() : new Set(items.map((item) => item.id)),
    );
  }

  function toggleSelect(id: number) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  async function handleQuantityChange(id: number, quantity: number) {
    const previous = items.find((item) => item.id === id)?.quantity;

    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );

    const ok = await updateQuantity(id, quantity);
    if (!ok && previous !== undefined) {
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity: previous } : item)),
      );
    }
  }

  async function handleRemove(id: number) {
    const ok = await removeCartItem(id);
    if (!ok) return;

    setItems((prev) => prev.filter((item) => item.id !== id));
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }

  const selectedItems = items.filter((item) => selectedIds.has(item.id));
  const subtotal = selectedItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const itemCount = selectedItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="mt-6 flex flex-col gap-8 xl:flex-row xl:items-start">
      <div className="min-w-0 flex-1">
        <Checkbox
          checked={allSelected}
          onChange={toggleSelectAll}
          label="Select All"
        />

        <div className="mt-6 flex flex-col gap-6">
          {items.map((item) => (
            <CartItemRow
              key={item.id}
              item={item}
              selected={selectedIds.has(item.id)}
              onToggleSelect={() => toggleSelect(item.id)}
              onQuantityChange={(quantity) =>
                handleQuantityChange(item.id, quantity)
              }
              onRemove={() => handleRemove(item.id)}
            />
          ))}
        </div>
      </div>

      <CartSummary itemCount={itemCount} subtotal={subtotal} />
    </div>
  );
}
