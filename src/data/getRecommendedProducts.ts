import "server-only";
import { ProductListItem } from "@/lib/types/product";
import { apiFetch } from "./apiFetch";

export async function getRecommendedProducts() {
  return apiFetch<ProductListItem[]>("/api/product/recommended");
}
