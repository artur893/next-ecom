import { useNotification } from "./useNotification";

export function useSetMainAddress() {
  const { showNotification } = useNotification();

  return async function setMainAddress(addressId: number) {
    const response = await fetch(`/api/address/${addressId}`, {
      method: "PATCH",
    });

    if (!response.ok) {
      showNotification("Could not update main address", "error");
    }

    return response.ok;
  };
}
