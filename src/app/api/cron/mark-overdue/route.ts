import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import cron from "node-cron";

cron.schedule("0 0 * * *", async () => {
  console.log("Running Cron Job: Checking overdue invoices...");

  const today = new Date();

  try {
    const overdueInvoices = await prisma.invoice.updateMany({
      where: {
        dueDate: {
          lt: today,
        },
        status: {
          not: "Paid",
        },
      },
      data: {
        status: "PAST_DUE",
      },
    });

    console.log(`Updated ${overdueInvoices.count} overdue invoices.`);
  } catch (error) {
    console.error("Cron Job Failed:", error);
  }
});

export async function GET() {
  return NextResponse.json({ message: "Cron job initialized." });
}
