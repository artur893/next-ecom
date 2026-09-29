import "server-only";
import { ProductListItem } from "@/types/product";
import { apiFetch } from "./apiFetch";

export async function getRecommendedProducts() {
  return apiFetch<ProductListItem[]>("/api/product/recommended");
}
