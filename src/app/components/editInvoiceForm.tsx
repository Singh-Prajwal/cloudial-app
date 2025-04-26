"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateInvoice } from "../actions/updateInvoice";
import { deleteInvoice } from "../actions/deleteInvoice";
import toast from "react-hot-toast";
import BackButton from "./backButton";

export default function EditInvoiceForm({
  invoice,
}: {
  invoice: {
    id: string;
    amount: number;
    dueDate: string;
    status: string;
  };
}) {
  const router = useRouter();
  const [amount, setAmount] = useState(invoice.amount.toString());
  const [dueDate, setDueDate] = useState(invoice.dueDate.split("T")[0]);
  const [status, setStatus] = useState(invoice.status);
  const [error, setError] = useState("");

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await updateInvoice({
        id: invoice.id,
        amount: parseFloat(amount),
        dueDate,
        status: status as "PENDING" | "PAID" | "OVERDUE",
      });
      toast.success("Invoice updated!");
      router.refresh();
    } catch (err) {
      toast.error("Failed to update invoice");
      setError("Failed to update invoice");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteInvoice(invoice.id);
      toast.success("Invoice deleted!");
      router.refresh();
    } catch (err) {
      toast.error("Failed to delete invoice");
      setError("Failed to delete invoice");
    }
  };

  return (
    <div className="max-w-md mx-auto text-black mt-6 p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold mb-4 text-black">Edit Invoice</h2>
        <BackButton />
      </div>
      <form onSubmit={handleUpdate} className="space-y-4">
        {error && <p className="text-red-500">{error}</p>}

        <div>
          <label className="block mb-1 font-medium">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          >
            <option value="PENDING">Pending</option>
            <option value="PAID">Paid</option>
            <option value="OVERDUE">Overdue</option>
          </select>
        </div>

        <div className="flex gap-4 pt-2">
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Update Invoice
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Delete Invoice
          </button>
        </div>
      </form>
    </div>
  );
}
