import "server-only";
import { notFound } from "next/navigation";
import { Order } from "@/lib/types/order";
import { apiFetch } from "./apiFetch";

export async function getOrder(id: number) {
  try {
    return await apiFetch<Order>(`/api/order/${id}`);
  } catch {
    notFound();
  }
}
