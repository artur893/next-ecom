import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const userId = Number(session.user.id);

  const order = await prisma.order.findFirst({
    where: { id: Number(id), userId },
    select: {
      id: true,
      invoiceNumber: true,
      paymentMethod: true,
      shippingMethod: true,
      productTotal: true,
      productProtection: true,
      shippingPrice: true,
      shippingInsurance: true,
      serviceFees: true,
      grandTotal: true,
      status: true,
      createdAt: true,
      items: {
        select: {
          id: true,
          quantity: true,
          price: true,
          product: {
            select: { name: true, images: true, category: { select: { name: true } } },
          },
        },
      },
    },
  });

  if (!order) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(order);
}
