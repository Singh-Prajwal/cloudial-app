import nodemailer from "nodemailer";

// Type for Invoice
interface Invoice {
  id: string;
  customerName: string;
  customerEmail: string;
  dueDate: Date;
  amount: number;
  status: string;
}

export const sendEmailReminder = async (invoice: Invoice): Promise<void> => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // Use your email service provider
    auth: {
      user: process.env.EMAIL_USER, // Set your email in the .env file
      pass: process.env.EMAIL_PASSWORD, // Set your email password in the .env file
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: invoice.customerEmail, // Assuming the invoice has a customerEmail field
    subject: `Invoice ${invoice.id} - Payment Reminder`,
    text: `Dear ${invoice.customerName},\n\nThis is a reminder that invoice ${invoice.id} is past due. Please make payment as soon as possible.\n\nThank you.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Sent reminder email for invoice ${invoice.id}`);
  } catch (error) {
    console.error("Error sending email reminder:", error);
  }
};
