"use server";

import { prisma } from "../lib/prisma";

interface UpdateInvoiceInput {
  id: string;
  amount?: number;
  dueDate?: string;
  status?: "PENDING" | "PAID" | "OVERDUE";
}

export async function updateInvoice(data: UpdateInvoiceInput) {
  try {
    const invoice = await prisma.invoice.findUnique({
      where: { id: data.id },
    });

    if (!invoice) {
      throw new Error("Invoice not found");
    }

    const logs = [];

    if (invoice.amount !== data.amount) {
      logs.push({
        fieldChanged: "amount",
        oldValue: invoice.amount.toString(),
        newValue: data.amount!.toString(),
      });
    }

    if (invoice.dueDate.toISOString().split("T")[0] !== data.dueDate) {
      logs.push({
        fieldChanged: "dueDate",
        oldValue: invoice.dueDate.toISOString().split("T")[0],
        newValue: data.dueDate,
      });
    }

    await prisma.invoice.update({
      where: { id: data.id },
      data: {
        ...(data.amount && { amount: data.amount }),
        ...(data.dueDate && { dueDate: new Date(data.dueDate) }),
        ...(data.status && { status: data.status }),
      },
    });

    // Create Invoice Logs
    // if (logs.length > 0) {
    //   await prisma.invoiceLog.createMany({
    //     data: logs.map((log) => ({
    //       invoiceId: invoice.id,
    //       fieldChanged: log.fieldChanged,
    //       oldValue: log.oldValue,
    //       newValue: log.newValue,
    //     })),
    //   });
    // }
    const updatedInvoice = await prisma.invoice.findUnique({
      where: { id: data.id },
    });
    return updatedInvoice;
  } catch (error) {
    console.error("Error updating invoice:", error);
    throw new Error("Failed to update invoice");
  }
}
