import { useNotification } from "./useNotification";

export function useUpdateCartItemQuantity() {
  const { showNotification } = useNotification();

  return async function updateCartItemQuantity(
    cartItemId: number,
    quantity: number,
  ) {
    const response = await fetch(`/api/cart/${cartItemId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    });

    if (!response.ok) {
      showNotification("Could not update quantity", "error");
    }

    return response.ok;
  };
}
