import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

const RECOMMENDATION_COUNT = 6;

function pickRandom<T>(items: T[], count: number) {
  const shuffled = [...items].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: { products: true },
    });

    const oneProductPerCategory = categories
      .filter((category) => category.products.length > 0)
      .map((category) => pickRandom(category.products, 1)[0]);

    const remainingSlots = RECOMMENDATION_COUNT - oneProductPerCategory.length;
    const usedIds = new Set(oneProductPerCategory.map((p) => p.id));
    const allProducts = categories.flatMap((category) => category.products);
    const extraPool = allProducts.filter((p) => !usedIds.has(p.id));
    const extras =
      remainingSlots > 0 ? pickRandom(extraPool, remainingSlots) : [];

    const categoryNameById = new Map(categories.map((c) => [c.id, c.name]));

    const products = [...oneProductPerCategory, ...extras].map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      images: product.images,
      category: { name: categoryNameById.get(product.categoryId) ?? "" },
    }));

    return NextResponse.json(products);
  } catch (error) {
    console.error("GET /api/product/recommended error:", error);

    return NextResponse.json(
      { error: "Nie udało się pobrać rekomendacji" },
      { status: 500 },
    );
  }
}
