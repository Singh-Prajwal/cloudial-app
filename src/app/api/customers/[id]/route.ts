// import { NextRequest, NextResponse } from "next/server";
// import prisma from "../../../lib/prisma";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../../../lib/authOptions"; // Correct authOptions import path

// export async function PATCH(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const session = await getServerSession(authOptions);
//   if (!session?.user?.id) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const { id } = params; // Destructuring id from params
//   const body = await req.json();

//   try {
//     const updatedUser = await prisma.user.update({
//       where: {
//         id: id, // Updating the user by id
//       },
//       data: {
//         ...body,
//       },
//     });
//     return NextResponse.json(updatedUser);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: "Update failed or user not found" },
//       { status: 400 }
//     );
//   }
// }
