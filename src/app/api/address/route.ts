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

  const addresses = await prisma.address.findMany({
    where: { userId },
    orderBy: { isMain: "desc" },
  });

  return NextResponse.json(addresses);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { country, province, city, postalCode, line, isMain } =
    await request.json();

  if (!country || !province || !city || !postalCode || !line) {
    return NextResponse.json(
      { error: "All address fields are required" },
      { status: 400 },
    );
  }

  const userId = Number(session.user.id);

  const address = await prisma.$transaction(async (tx) => {
    if (isMain) {
      await tx.address.updateMany({
        where: { userId, isMain: true },
        data: { isMain: false },
      });
    }

    return tx.address.create({
      data: {
        userId,
        country,
        province,
        city,
        postalCode,
        line,
        isMain: Boolean(isMain),
      },
    });
  });

  return NextResponse.json(address, { status: 201 });
}
