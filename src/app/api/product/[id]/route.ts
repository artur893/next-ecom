import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { withErrorHandling } from "@/lib/apiHandler";

export const revalidate = 0;

export const GET = withErrorHandling(
  async (
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
  ) => {
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
      include: {
        category: { select: { name: true } },
        brand: { select: { name: true } },
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Produkt nie istnieje" },
        { status: 404 },
      );
    }

    return NextResponse.json(product);
  },
);
