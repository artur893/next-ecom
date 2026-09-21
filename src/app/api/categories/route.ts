import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { withErrorHandling } from "@/lib/apiHandler";

export const revalidate = 0;

export const GET = withErrorHandling(async () => {
  const categories = await prisma.category.findMany();

  return NextResponse.json(categories);
});
