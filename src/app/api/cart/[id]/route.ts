import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { withErrorHandling } from "@/lib/apiHandler";

async function findOwnedCartItem(cartItemId: number, userId: number) {
  const cartItem = await prisma.cartItem.findUnique({
    where: { id: cartItemId },
    select: {
      cart: { select: { userId: true } },
      product: { select: { name: true, stock: true } },
    },
  });

  return cartItem?.cart.userId === userId ? cartItem : null;
}

export const PATCH = withErrorHandling(
  async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
  ) => {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const { quantity } = await request.json();

    if (!quantity || Number(quantity) < 1) {
      return NextResponse.json(
        { error: "quantity must be at least 1" },
        { status: 400 },
      );
    }

    const userId = Number(session.user.id);
    const cartItem = await findOwnedCartItem(Number(id), userId);

    if (!cartItem) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (Number(quantity) > cartItem.product.stock) {
      return NextResponse.json(
        {
          error: `Only ${cartItem.product.stock} left in stock for ${cartItem.product.name}`,
        },
        { status: 400 },
      );
    }

    const updated = await prisma.cartItem.update({
      where: { id: Number(id) },
      data: { quantity: Number(quantity) },
    });

    return NextResponse.json(updated);
  },
);

export const DELETE = withErrorHandling(
  async (
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
  ) => {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const userId = Number(session.user.id);

    if (!(await findOwnedCartItem(Number(id), userId))) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await prisma.cartItem.delete({ where: { id: Number(id) } });

    return NextResponse.json({ success: true });
  },
);
