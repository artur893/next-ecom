import { notifyCartChanged } from "@/lib/cart";
import { useNotification } from "./useNotification";

export function useRemoveCartItem() {
  const { showNotification } = useNotification();

  return async function removeCartItem(cartItemId: number) {
    const response = await fetch(`/api/cart/${cartItemId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      notifyCartChanged();
    } else {
      showNotification("Could not remove item", "error");
    }

    return response.ok;
  };
}
