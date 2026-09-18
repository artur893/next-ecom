"use client";
import { TrashIcon, MinusIcon, PlusIcon } from "@/app/components/icons";
import { CartItem } from "@/lib/types/cart";
import Checkbox from "../basics/Checkbox";
import ProductImageFrame from "../product/ProductImageFrame";

export default function CartItemRow({
  item,
  selected,
  onToggleSelect,
  onQuantityChange,
  onRemove,
}: {
  item: CartItem;
  selected: boolean;
  onToggleSelect: () => void;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center gap-4">
      <Checkbox checked={selected} onChange={onToggleSelect} />

      <div className="flex-1 rounded-md border border-gray-800 bg-neutral-900 p-6">
        <div className="flex gap-4">
          <ProductImageFrame
            src={item.product.images[0]}
            alt={item.product.name}
            sizes="172px"
            className="h-34.5 w-43 shrink-0"
            innerClassName="p-2"
          />

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-4">
              <p className="text-heading-7 font-medium text-[#FCFCFC]">
                {item.product.name}
              </p>
              <button type="button" onClick={onRemove} aria-label="Remove item">
                <TrashIcon width={30} height={30} />
              </button>
            </div>

            <span className="mt-2 inline-block rounded bg-primary-500 px-2 py-1 text-paragraph-s font-medium text-primary-100">
              {item.product.category.name}
            </span>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
              <p className="text-heading-6 font-medium text-[#FCFCFC]">
                ${item.product.price.toFixed(2)}
              </p>
              <div className="flex gap-6 items-center">
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
                    onClick={() =>
                      onQuantityChange(Math.max(1, item.quantity - 1))
                    }
                    aria-label="Decrease quantity"
                  >
                    <MinusIcon width={16} height={16} />
                  </button>
                  <span className="w-6 text-center text-paragraph-m">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => onQuantityChange(item.quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    <PlusIcon width={16} height={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
