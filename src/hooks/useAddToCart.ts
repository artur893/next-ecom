import { notifyCartChanged } from "@/lib/cart";
import { useNotification } from "./useNotification";

export function useAddToCart() {
  const { showNotification } = useNotification();

  return async function addToCart(productId: number, quantity = 1) {
    const response = await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity }),
    });

    if (response.ok) {
      notifyCartChanged();
      showNotification("Product Successfully Added");
      return true;
    }

    const result = await response.json();
    showNotification(
      result.error ?? "Could not add product to cart",
      "error",
    );
    return false;
  };
}
