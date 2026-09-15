import { useNotification } from "@/app/components/providers/NotificationProvider";

export function useAddToCart() {
  const { showNotification } = useNotification();

  return async function addToCart(productId: number) {
    const response = await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });

    if (response.ok) {
      showNotification("Product Successfully Added");
    } else {
      showNotification("Could not add product to cart", "error");
    }
  };
}
