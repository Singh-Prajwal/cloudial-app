import { notFound } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import DeleteInvoiceButton from "../../../components/deleteInvoiceButton";
import BackButton from "@/app/components/backButton";
import { JSX } from "react";

const prisma = new PrismaClient();

export default async function UserPage({ params }: any) {
  const { id } = params;

  const user = await prisma.user.findUnique({
    where: { id },
  });
  let invoices: any = [];
  if (user) {
    invoices = await prisma.invoice.findMany({
      where: { customerId: user.id },
    });
  }

  if (!user) notFound();
  console.log("user", user);

  return (
    <div className="p-6">
      <div className="mb-8 text-black">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold mb-2">{user.name} Details</h1>
          <BackButton />
        </div>
        <p className="text-gray-700">Email: {user.email}</p>
        <p className="text-gray-700">
          Contact: {user?.email || "Not provided"}
        </p>
        <p className="text-gray-700">User Id: {user.id || "Not provided"}</p>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Invoices</h2>
        <Link
          href={`/customer/${id}/add-invoice`}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Invoice
        </Link>
      </div>

      <div className="overflow-x-auto text-black">
        <table className="min-w-full bg-white border rounded">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4 border-b">Invoice ID</th>
              <th className="py-2 px-4 border-b">Amount</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Due Date</th>
              <th className="py-2 px-4 border-b">External Invoice ID</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices &&
              invoices.map((invoice: any) => (
                <tr key={invoice.id}>
                  <td className="py-2 px-4 border-b">{invoice.id}</td>
                  <td className="py-2 px-4 border-b">
                    ${invoice.amount.toFixed(2)}
                  </td>
                  <td className="py-2 px-4 border-b">{invoice.status}</td>
                  <td className="py-2 px-4 border-b">
                    {new Date(invoice.dueDate).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {invoice.externalInvoiceId || "N/A"}
                  </td>
                  <td className="py-2 px-4 border-b flex gap-2">
                    <Link
                      href={`/invoice/${invoice.id}/edit`}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>
                    <DeleteInvoiceButton
                      invoiceId={invoice.id}
                      customerId={id}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
