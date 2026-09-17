import "server-only";
import { ProductListResponse } from "@/lib/types/product";
import { apiFetch } from "./apiFetch";

export async function getProducts(query: URLSearchParams) {
  return apiFetch<ProductListResponse>(`/api/product?${query.toString()}`);
}
