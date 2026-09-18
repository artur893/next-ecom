import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function isOwnedByUser(cartItemId: number, userId: number) {
  const cartItem = await prisma.cartItem.findUnique({
    where: { id: cartItemId },
    select: { cart: { select: { userId: true } } },
  });

  return cartItem?.cart.userId === userId;
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
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

  if (!(await isOwnedByUser(Number(id), userId))) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const updated = await prisma.cartItem.update({
    where: { id: Number(id) },
    data: { quantity: Number(quantity) },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const userId = Number(session.user.id);

  if (!(await isOwnedByUser(Number(id), userId))) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.cartItem.delete({ where: { id: Number(id) } });

  return NextResponse.json({ success: true });
}
