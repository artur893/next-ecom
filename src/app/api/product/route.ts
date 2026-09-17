import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const revalidate = 0;

const sortOptions: Record<string, Prisma.ProductOrderByWithRelationInput> = {
  recent: { id: "desc" },
  topPrice: { price: "desc" },
  lessPrice: { price: "asc" },
};

export async function GET(request: NextRequest) {
  const categoryId = request.nextUrl.searchParams.get("category");
  const minPrice = request.nextUrl.searchParams.get("minPrice");
  const maxPrice = request.nextUrl.searchParams.get("maxPrice");
  const sort = request.nextUrl.searchParams.get("sort");
  const limit = request.nextUrl.searchParams.get("limit");
  const offset = request.nextUrl.searchParams.get("offset");

  const product = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      originalPrice: true,
      images: true,
      category: { select: { name: true } },
    },
    where: {
      categoryId: categoryId ? Number(categoryId) : undefined,
      price: {
        gte: minPrice ? Number(minPrice) : undefined,
        lte: maxPrice ? Number(maxPrice) : undefined,
      },
    },
    orderBy: sort ? sortOptions[sort] : undefined,
    take: limit ? Number(limit) : 20,
    skip: offset ? Number(offset) : undefined,
  });

  return NextResponse.json(product);
}
