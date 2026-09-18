import { useNotification } from "./useNotification";

export function useRemoveAddress() {
  const { showNotification } = useNotification();

  return async function removeAddress(addressId: number) {
    const response = await fetch(`/api/address/${addressId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      showNotification("Could not remove address", "error");
    }

    return response.ok;
  };
}
