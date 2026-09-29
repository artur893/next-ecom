import "server-only";
import { Address } from "@/types/address";
import { apiFetch } from "./apiFetch";

export async function getAddresses() {
  return apiFetch<Address[]>("/api/address");
}
