import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId } = await request.json();

    if (!productId) {
      return NextResponse.json(
        { error: "productId is required" },
        { status: 400 },
      );
    }

    const userId = Number(session.user.id);

    const cart = await prisma.cart.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });

    const cartItem = await prisma.cartItem.upsert({
      where: {
        cartId_productId: { cartId: cart.id, productId: Number(productId) },
      },
      create: { cartId: cart.id, productId: Number(productId), quantity: 1 },
      update: { quantity: { increment: 1 } },
    });

    return NextResponse.json(cartItem, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Nie udało się dodać produktu do koszyka" },
      { status: 500 },
    );
  }
}
