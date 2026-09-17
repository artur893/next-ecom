import "server-only";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/lib/types/product";
import { apiFetch } from "./apiFetch";

export async function getProduct(id: number) {
  try {
    return await apiFetch<ProductDetail>(`/api/product/${id}`);
  } catch {
    notFound();
  }
}
