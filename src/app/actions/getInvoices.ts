// /actions/getInvoices.ts
"use server";

import prisma from "../lib/prisma";

export async function getInvoices(customerId?: string) {
  try {
    const whereClause = customerId ? { customerId } : {};

    const invoices = await prisma.invoice.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        customer: true,
      },
    });

    return invoices;
  } catch (error) {
    console.error("Error fetching invoices:", error);
    throw new Error("Failed to fetch invoices");
  }
}
