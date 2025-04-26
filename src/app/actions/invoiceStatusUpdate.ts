"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function updateInvoiceStatus(invoiceId: string, status: string) {
  if (!["paid", "unpaid", "overdue"].includes(status)) {
    throw new Error("Invalid status");
  }

  await prisma.invoice.update({
    where: { id: invoiceId },
    data: { status },
  });
}
