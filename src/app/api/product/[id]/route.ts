import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const numId = Number(id);

    if (isNaN(numId)) {
      return NextResponse.json(
        { error: "ID musi być liczbą" },
        { status: 400 },
      );
    }

    const product = await prisma.product.findUnique({
      where: { id: numId },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Produkt nie istnieje" },
        { status: 404 },
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("GET /api/product/[id] error:", error);

    return NextResponse.json(
      { error: "Nie udało się pobrać produktu" },
      { status: 500 },
    );
  }
}
