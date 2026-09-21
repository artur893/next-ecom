import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = Number(session.user.id);

  const cartItems = await prisma.cartItem.findMany({
    where: { cart: { userId } },
    select: {
      id: true,
      quantity: true,
      product: {
        select: {
          id: true,
          name: true,
          price: true,
          stock: true,
          images: true,
          category: { select: { name: true } },
        },
      },
    },
  });

  return NextResponse.json(cartItems);
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId, quantity } = await request.json();

    if (!productId) {
      return NextResponse.json(
        { error: "productId is required" },
        { status: 400 },
      );
    }

    const addedQuantity = quantity ? Number(quantity) : 1;

    if (addedQuantity < 1) {
      return NextResponse.json(
        { error: "quantity must be at least 1" },
        { status: 400 },
      );
    }

    const userId = Number(session.user.id);

    const product = await prisma.product.findUnique({
      where: { id: Number(productId) },
      select: { name: true, stock: true },
    });

    if (!product) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const cart = await prisma.cart.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });

    const existing = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: { cartId: cart.id, productId: Number(productId) },
      },
      select: { quantity: true },
    });

    const newQuantity = (existing?.quantity ?? 0) + addedQuantity;

    if (newQuantity > product.stock) {
      return NextResponse.json(
        { error: `Only ${product.stock} left in stock for ${product.name}` },
        { status: 400 },
      );
    }

    const cartItem = await prisma.cartItem.upsert({
      where: {
        cartId_productId: { cartId: cart.id, productId: Number(productId) },
      },
      create: {
        cartId: cart.id,
        productId: Number(productId),
        quantity: addedQuantity,
      },
      update: { quantity: newQuantity },
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
