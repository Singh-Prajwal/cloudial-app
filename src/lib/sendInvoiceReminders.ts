import { PrismaClient } from "@prisma/client";
import { sendEmailReminder } from "./sendReminderEmails.ts";

const prisma = new PrismaClient();

async function sendReminders() {
  const overdueInvoices = await prisma.invoice.findMany({
    where: {
      dueDate: { lt: new Date() },
      status: "PENDING",
    },
    // include: {
    //   customer: true, //s This refers to the `User` model now
    // },
  });

  for (const invoice of overdueInvoices) {
    const user = await prisma.user.findUnique({
      where: { id: invoice.customerId },
    });

    if (!user?.email) continue;

    await sendEmailReminder({
      id: invoice.id,
      customerName: user.name ?? "Customer",
      customerEmail: user.email,
      dueDate: invoice.dueDate,
      amount: invoice.amount,
      status: invoice.status,
    });
  }
}

sendReminders()
  .then(() => {
    console.log("✅ All reminders sent.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Error sending reminders:", err);
    process.exit(1);
  });
