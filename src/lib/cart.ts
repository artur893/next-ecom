import { CartItem } from "@/types/cart";

export const CART_CHANGED_EVENT = "cart:changed";

export function notifyCartChanged() {
  window.dispatchEvent(new Event(CART_CHANGED_EVENT));
}

export function countCartItems(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}
