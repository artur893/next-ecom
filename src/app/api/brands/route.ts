import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export async function GET() {
  try {
    const brands = await prisma.brand.findMany();
    return NextResponse.json(brands);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Nie udało się pobrać marek" },
      { status: 500 },
    );
  }
}
