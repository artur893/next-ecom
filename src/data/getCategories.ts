import "server-only";
import { Category } from "@prisma/client";
import { apiFetch } from "./apiFetch";

export async function getCategories() {
  return apiFetch<Category[]>("/api/categories");
}
