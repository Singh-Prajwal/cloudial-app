import { prisma } from "../../../../lib/prisma";
import EditInvoiceForm from "../../../../components/editInvoiceForm";
import BackButton from "@/app/components/backButton";

export default async function EditInvoicePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const invoice = await prisma.invoice.findUnique({
    where: { id: id },
  });

  if (!invoice) {
    return <p className="p-4 text-red-600">Invoice not found.</p>;
  }

  console.log("id,", id);
  return (
    <div className="max-w-2xl mx-auto mt-10">
      <EditInvoiceForm
        invoice={{
          id: invoice.id,
          amount: invoice.amount,
          dueDate: invoice.dueDate.toISOString(),
          status: invoice.status,
        }}
      />
    </div>
  );
}
