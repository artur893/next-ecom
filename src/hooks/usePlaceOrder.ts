import { Order } from "@/lib/types/order";
import { useNotification } from "./useNotification";

export function usePlaceOrder() {
  const { showNotification } = useNotification();

  return async function placeOrder(data: {
    cartItemIds: number[];
    protectedCartItemIds: number[];
    paymentMethod: string;
    shippingMethod: string;
  }) {
    const response = await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      showNotification("Could not place order", "error");
      return null;
    }

    return (await response.json()) as Order;
  };
}
