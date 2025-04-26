"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const [users, totalUsers, unpaidInvoices, invoices, outstandingInvoices] =
      await Promise.all([
        prisma.user.findMany({
          take: 10,
        }),
        prisma.user.count(),
        prisma.invoice.count({ where: { status: { not: "Paid" } } }),
        prisma.invoice.findMany({
          select: { amount: true, dueDate: true },
          orderBy: { dueDate: "asc" },
        }),
        prisma.invoice.findMany({
          where: { status: { not: "Paid" } },
          select: { amount: true },
        }),
      ]);
    console.log("users", users);
    const revenueData = invoices.reduce((acc, invoice) => {
      const month = new Date(invoice.dueDate).toLocaleString("default", {
        month: "short",
        year: "numeric",
      });
      acc[month] = (acc[month] || 0) + invoice.amount;
      return acc;
    }, {} as Record<string, number>);

    const outstandingBalance = outstandingInvoices.reduce(
      (acc, invoice) => acc + invoice.amount,
      0
    );
    return new Response(
      JSON.stringify({
        users,
        totalUsers,
        unpaidInvoices,
        revenueData,
        outstandingBalance,
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return new Response("Error fetching dashboard data", { status: 500 });
  }
}
