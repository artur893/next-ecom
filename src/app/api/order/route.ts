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

export async function POST(request: NextRequest) {
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
      product: { select: { id: true, price: true } },
    },
  });

  if (cartItems.length !== cartItemIds.length) {
    return NextResponse.json(
      { error: "Some cart items were not found" },
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
}
