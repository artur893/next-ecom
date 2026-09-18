"use client";
import { useState } from "react";
import Checkbox from "../basics/Checkbox";
import CartItemRow, { CartItemData } from "./CartItemRow";
import CartSummary from "./CartSummary";

export default function CartView({ items }: { items: CartItemData[] }) {
  const [quantities, setQuantities] = useState<Record<number, number>>(
    Object.fromEntries(items.map((item) => [item.id, item.quantity])),
  );
  const [selectedIds, setSelectedIds] = useState<Set<number>>(
    new Set(items.map((item) => item.id)),
  );

  const allSelected = selectedIds.size === items.length && items.length > 0;

  function toggleSelectAll() {
    setSelectedIds(allSelected ? new Set() : new Set(items.map((i) => i.id)));
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

  function updateQuantity(id: number, quantity: number) {
    setQuantities((prev) => ({ ...prev, [id]: quantity }));
  }

  function removeItem(id: number) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }

  const selectedItems = items.filter((item) => selectedIds.has(item.id));
  const subtotal = selectedItems.reduce(
    (sum, item) => sum + item.price * quantities[item.id],
    0,
  );
  const itemCount = selectedItems.reduce(
    (sum, item) => sum + quantities[item.id],
    0,
  );

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
              item={{ ...item, quantity: quantities[item.id] }}
              selected={selectedIds.has(item.id)}
              onToggleSelect={() => toggleSelect(item.id)}
              onQuantityChange={(quantity) => updateQuantity(item.id, quantity)}
              onRemove={() => removeItem(item.id)}
            />
          ))}
        </div>
      </div>

      <CartSummary itemCount={itemCount} subtotal={subtotal} />
    </div>
  );
}
