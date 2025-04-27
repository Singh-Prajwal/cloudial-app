"use server";

import prisma from "@/app/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { externalCustomerId, externalInvoiceId, amount, dueDate, status } =
      body;

    if (
      !externalCustomerId ||
      !externalInvoiceId ||
      !amount ||
      !dueDate ||
      !status
    ) {
      return new Response("Missing required fields", { status: 400 });
    }

    const customer = await prisma.user.findUnique({
      where: { id: externalCustomerId },
    });

    if (!customer) {
      return new Response("Customer not found", { status: 404 });
    }

    const existingInvoice = await prisma.invoice.findUnique({
      where: { id: externalInvoiceId },
    });

    let invoice;
    if (existingInvoice) {
      invoice = await prisma.invoice.update({
        where: { id: externalInvoiceId },
        data: {
          amount,
          dueDate: new Date(dueDate),
          status,
        },
      });
    } else {
      invoice = await prisma.invoice.create({
        data: {
          externalInvoiceId,
          customerId: customer.id,
          amount,
          dueDate: new Date(dueDate),
          status,
        },
      });
    }
    return new Response(JSON.stringify(invoice), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
