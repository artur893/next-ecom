import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { withErrorHandling } from "@/lib/apiHandler";

export const revalidate = 0;

export const GET = withErrorHandling(async () => {
  const brands = await prisma.brand.findMany();

  return NextResponse.json(brands);
});
