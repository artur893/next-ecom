import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { SORT_OPTIONS } from "@/lib/productSort";

export const revalidate = 0;

export async function GET(request: NextRequest) {
  const categoryId = request.nextUrl.searchParams.get("category");
  const minPrice = request.nextUrl.searchParams.get("minPrice");
  const maxPrice = request.nextUrl.searchParams.get("maxPrice");
  const sort = request.nextUrl.searchParams.get("sort");
  const limit = request.nextUrl.searchParams.get("limit");
  const offset = request.nextUrl.searchParams.get("offset");

  const where = {
    categoryId: categoryId ? Number(categoryId) : undefined,
    price: {
      gte: minPrice ? Number(minPrice) : undefined,
      lte: maxPrice ? Number(maxPrice) : undefined,
    },
  };

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        originalPrice: true,
        images: true,
        category: { select: { name: true } },
      },
      where,
      orderBy: sort ? SORT_OPTIONS[sort] : undefined,
      take: limit ? Number(limit) : 20,
      skip: offset ? Number(offset) : undefined,
    }),
    prisma.product.count({ where }),
  ]);

  return NextResponse.json({ products, total });
}
