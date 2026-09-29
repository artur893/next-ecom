import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { withErrorHandling } from "@/lib/apiHandler";
import { isValidPhone, normalizePhone } from "@/lib/phone";

export const POST = withErrorHandling(async (request: NextRequest) => {
  const {
    email: rawEmail,
    password,
    mobile: rawMobile,
    country,
  } = await request.json();

  if (!rawEmail || !password || !rawMobile) {
    return NextResponse.json(
      { error: "Email, password and phone number are required" },
      { status: 400 },
    );
  }

  if (!isValidPhone(rawMobile)) {
    return NextResponse.json(
      { error: "Please enter a valid phone number" },
      { status: 400 },
    );
  }

  const email = rawEmail.toLowerCase().trim();
  const mobile = normalizePhone(rawMobile);

  const existingUser = await prisma.user.findFirst({
    where: { OR: [{ email }, { mobile }] },
    select: { email: true },
  });

  if (existingUser) {
    return NextResponse.json(
      {
        error:
          existingUser.email === email
            ? "Email is already in use"
            : "Phone number is already in use",
      },
      { status: 409 },
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: { email, passwordHash, mobile, country },
    });

    return NextResponse.json(
      { id: user.id, email: user.email },
      { status: 201 },
    );
  } catch (error) {
    // two registrations can pass the check above before either is written
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "Email or phone number is already in use" },
        { status: 409 },
      );
    }
    throw error;
  }
});
