import { Prisma } from "@prisma/client";

export const SORT_OPTIONS: Record<string, Prisma.ProductOrderByWithRelationInput> = {
  recent: { id: "desc" },
  topPrice: { price: "desc" },
  lessPrice: { price: "asc" },
};

export const SORT_LABELS: Record<string, string> = {
  recent: "Latest",
  lessPrice: "Price: Low to High",
  topPrice: "Price: High to Low",
};
