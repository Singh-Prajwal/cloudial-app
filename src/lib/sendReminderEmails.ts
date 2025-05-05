import nodemailer from "nodemailer";

export interface InvoiceReminder {
  id: string;
  customerName: string;
  customerEmail: string;
  dueDate: Date;
  amount: number;
  status: string;
}

export const sendEmailReminder = async (
  invoice: InvoiceReminder
): Promise<void> => {
  const { customerEmail, customerName, amount, dueDate, id } = invoice;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: customerEmail,
    subject: `Invoice ${id} - Payment Reminder`,
    text: `Dear ${customerName},\n\nThis is a reminder that invoice ${id} of ₹${amount} is past due since ${dueDate.toDateString()}. Please make payment as soon as possible.\n\nThank you.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Sent reminder email for invoice ${id}`);
  } catch (error) {
    console.error("❌ Error sending email reminder:", error);
  }
};
