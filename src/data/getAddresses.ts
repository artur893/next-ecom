import "server-only";
import { Address } from "@/lib/types/address";
import { apiFetch } from "./apiFetch";

export async function getAddresses() {
  return apiFetch<Address[]>("/api/address");
}
