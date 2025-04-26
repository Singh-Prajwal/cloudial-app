"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function deleteInvoice(id: string) {
  try {
    await prisma.invoice.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Error deleting invoice:", error);
    throw new Error("Failed to delete invoice");
  }
}
