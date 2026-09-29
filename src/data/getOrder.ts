import "server-only";
import { Order } from "@/types/order";
import { apiFetchOrNotFound } from "./apiFetch";

export async function getOrder(id: number) {
  return apiFetchOrNotFound<Order>(`/api/order/${id}`);
}
