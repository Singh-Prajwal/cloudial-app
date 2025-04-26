"use server";

import { redirect } from "next/navigation";
import prisma from "../lib/prisma";

export async function addInvoice(formData: FormData) {
  try {
    const amount = parseFloat(formData.get("amount") as string);
    const status = formData.get("status") as string;
    const dueDate = new Date(formData.get("dueDate") as string);
    const customerId = formData.get("customerId") as string;

    if (isNaN(amount) || amount <= 0) {
      throw new Error("Amount must be a positive number.");
    }
    if (!status || !dueDate || !customerId) {
      throw new Error("All fields are required.");
    }

    // Create Invoice
    await prisma.invoice.create({
      data: {
        amount,
        status,
        dueDate,
        customerId,
      },
    });

    redirect(`/customer/${customerId}`);
  } catch (error: any) {
    console.error("Failed to create invoice:", error.message);
    throw new Error("Failed to create invoice. Please try again.");
  }
}
