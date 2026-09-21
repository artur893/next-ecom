import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateInvoiceNumber } from "@/lib/invoiceNumber";
import {
  PRODUCT_PROTECTION_PRICE,
  SHIPPING_PRICE,
  SHIPPING_INSURANCE,
  SERVICE_FEES,
} from "@/lib/checkoutPricing";
import { withErrorHandling } from "@/lib/apiHandler";

export const GET = withErrorHandling(async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const orders = await prisma.order.findMany({
    where: { userId: Number(session.user.id) },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      invoiceNumber: true,
      createdAt: true,
      items: {
        select: {
          id: true,
          product: { select: { name: true } },
        },
      },
    },
  });

  return NextResponse.json(orders);
});

export const POST = withErrorHandling(async (request: NextRequest) => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { cartItemIds, protectedCartItemIds, paymentMethod, shippingMethod } =
    await request.json();

  if (!Array.isArray(cartItemIds) || cartItemIds.length === 0) {
    return NextResponse.json(
      { error: "cartItemIds is required" },
      { status: 400 },
    );
  }

  const userId = Number(session.user.id);

  const cartItems = await prisma.cartItem.findMany({
    where: { id: { in: cartItemIds }, cart: { userId } },
    select: {
      id: true,
      quantity: true,
      product: { select: { id: true, name: true, price: true, stock: true } },
    },
  });

  if (cartItems.length !== cartItemIds.length) {
    return NextResponse.json(
      { error: "Some cart items were not found" },
      { status: 400 },
    );
  }

  const outOfStock = cartItems.find(
    (item) => item.quantity > item.product.stock,
  );

  if (outOfStock) {
    return NextResponse.json(
      {
        error: `Only ${outOfStock.product.stock} left in stock for ${outOfStock.product.name}`,
      },
      { status: 400 },
    );
  }

  const protectedIds = new Set(
    Array.isArray(protectedCartItemIds) ? protectedCartItemIds : [],
  );
  const protectedCount = cartItems.filter((item) =>
    protectedIds.has(item.id),
  ).length;

  const productTotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const productProtection = protectedCount * PRODUCT_PROTECTION_PRICE;
  const grandTotal =
    productTotal +
    productProtection +
    SHIPPING_PRICE +
    SHIPPING_INSURANCE +
    SERVICE_FEES;

  const order = await prisma.$transaction(async (tx) => {
    for (const item of cartItems) {
      const reserved = await tx.product.updateMany({
        where: { id: item.product.id, stock: { gte: item.quantity } },
        data: { stock: { decrement: item.quantity } },
      });

      // stock can be taken by another order between the check above and this update
      if (reserved.count === 0) {
        throw new Error(`Insufficient stock for product ${item.product.id}`);
      }
    }

    const created = await tx.order.create({
      data: {
        invoiceNumber: generateInvoiceNumber(),
        userId,
        paymentMethod: paymentMethod || "Apple Pay",
        shippingMethod: shippingMethod || "NexusHub Courier",
        productTotal,
        productProtection,
        shippingPrice: SHIPPING_PRICE,
        shippingInsurance: SHIPPING_INSURANCE,
        serviceFees: SERVICE_FEES,
        grandTotal,
        items: {
          create: cartItems.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      },
    });

    await tx.cartItem.deleteMany({
      where: { id: { in: cartItems.map((item) => item.id) } },
    });

    return created;
  });

  return NextResponse.json(order, { status: 201 });
});
