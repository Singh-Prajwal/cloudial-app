"use client";
import { JSX, useState } from "react";
import { addInvoice } from "../../../../actions/addInvoice";
import BackButton from "@/app/components/backButton";
export default function AddInvoicePage({
  params,
}: {
  params: { id: string };
}): JSX.Element {
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("PENDING");
  const [dueDate, setDueDate] = useState("");
  // const { id } = use(params);
  const { id } = params;
  return (
    <div className="max-w-md mx-auto text-black mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-6 text-center">Add Invoice</h1>
        <BackButton />
      </div>
      <form action={addInvoice} className="space-y-4">
        <input type="hidden" name="customerId" value={id} />

        <div>
          <label className="block mb-1 font-medium">Amount</label>
          <input
            type="number"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Status</label>
          <select
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            required
          >
            <option value="PENDING">Pending</option>
            <option value="PAID">Paid</option>
            <option value="OVERDUE">Overdue</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Add Invoice
        </button>
      </form>
    </div>
  );
}
