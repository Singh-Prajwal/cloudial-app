import { NextRequest, NextResponse } from "next/server";
import prisma from "../../lib/prisma";
import { getServerSession } from "next-auth";
// import { authOptions } from "../auth/[...nextauth]/route";
import { authOptions } from "../../../lib/authOptions";
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.redirect("/login"); // Redirect to login on unauthorized access
  }

  const customers = await prisma.user.findMany({
    where: { id: session.user.id }, // Fetch only the logged-in user's data
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  return NextResponse.json(customers);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.redirect("/login"); // Redirect to login on unauthorized access
  }

  const { name, email, phone, address } = await req.json();

  if (!name || !email) {
    return NextResponse.json(
      { error: "Name and Email are required" },
      { status: 400 }
    );
  }
  const existingUser = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  try {
    const updatedUser = await prisma.user.update({
      where: { id: existingUser!.id },
      data: {
        name,
        email,
      },
    });

    return NextResponse.json(updatedUser, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update user info. Email must be unique." },
      { status: 400 }
    );
  }
}
