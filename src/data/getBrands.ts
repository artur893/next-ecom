import "server-only";
import { Brand } from "@prisma/client";
import { apiFetch } from "./apiFetch";

export async function getBrands() {
  return apiFetch<Brand[]>("/api/brands");
}
