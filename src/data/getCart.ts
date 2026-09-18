import "server-only";
import { CartItem } from "@/lib/types/cart";
import { apiFetch } from "./apiFetch";

export async function getCart() {
  return apiFetch<CartItem[]>("/api/cart");
}
