import "server-only";
import { OrderListItem } from "@/lib/types/order";
import { apiFetch } from "./apiFetch";

export async function getOrders() {
  return apiFetch<OrderListItem[]>("/api/order");
}
