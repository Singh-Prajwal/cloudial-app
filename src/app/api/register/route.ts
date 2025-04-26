import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists." },
        { status: 409 }
      );
    }

    await prisma.user.create({
      data: {
        name: name || null, // Optional
        email,
      },
    });

    return NextResponse.json(
      { message: "User registered successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in registration:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
