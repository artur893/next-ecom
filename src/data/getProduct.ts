import "server-only";
import { ProductDetail } from "@/types/product";
import { apiFetchOrNotFound } from "./apiFetch";

export async function getProduct(id: number) {
  return apiFetchOrNotFound<ProductDetail>(`/api/product/${id}`);
}
