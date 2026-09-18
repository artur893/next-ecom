import { Address } from "@/lib/types/address";
import { useNotification } from "./useNotification";

export function useSaveAddress() {
  const { showNotification } = useNotification();

  return async function saveAddress(data: Omit<Address, "id">) {
    const response = await fetch("/api/address", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      showNotification("Could not save address", "error");
      return null;
    }

    showNotification("Address saved");
    return (await response.json()) as Address;
  };
}
