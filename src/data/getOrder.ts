import "server-only";
import { Order } from "@/lib/types/order";
import { apiFetchOrNotFound } from "./apiFetch";

export async function getOrder(id: number) {
  return apiFetchOrNotFound<Order>(`/api/order/${id}`);
}
