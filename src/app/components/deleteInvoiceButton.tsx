// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function DeleteInvoiceButton({
//   invoiceId,
// }: {
//   invoiceId: string;
// }) {
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleDelete = async () => {
//     setLoading(true);

//     const res = await fetch(`/api/invoices/${invoiceId}`, {
//       method: "DELETE",
//     });

//     setLoading(false);

//     if (res.ok) {
//       router.push("/invoices");
//     } else {
//       alert("Failed to delete invoice");
//     }
//   };

//   return (
//     <button
//       onClick={handleDelete}
//       disabled={loading}
//       className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
//     >
//       {loading ? "Deleting..." : "Delete"}
//     </button>
//   );
// }

"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteInvoice } from "../actions/deleteInvoice";

interface DeleteInvoiceButtonProps {
  invoiceId: string;
  customerId: string;
}

export default function DeleteInvoiceButton({
  invoiceId,
  customerId,
}: DeleteInvoiceButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      await deleteInvoice(invoiceId);
      router.push(`/customer/${customerId}`);
    });
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition disabled:opacity-50"
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}
