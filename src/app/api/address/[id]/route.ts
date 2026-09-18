import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const userId = Number(session.user.id);
  const addressId = Number(id);

  const address = await prisma.address.findUnique({
    where: { id: addressId },
    select: { userId: true },
  });

  if (!address || address.userId !== userId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const updated = await prisma.$transaction(async (tx) => {
    await tx.address.updateMany({
      where: { userId, isMain: true },
      data: { isMain: false },
    });

    return tx.address.update({
      where: { id: addressId },
      data: { isMain: true },
    });
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
  const addressId = Number(id);

  const address = await prisma.address.findUnique({
    where: { id: addressId },
    select: { userId: true, isMain: true },
  });

  if (!address || address.userId !== userId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (address.isMain) {
    return NextResponse.json(
      { error: "Cannot delete the main address" },
      { status: 400 },
    );
  }

  await prisma.address.delete({ where: { id: addressId } });

  return NextResponse.json({ success: true });
}
