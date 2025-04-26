"use client";

import { useState } from "react";
import { updateInvoiceStatus } from "../actions/invoiceStatusUpdate";

interface InvoiceStatusButtonProps {
  invoiceId: string;
  currentStatus: string;
}

export default function InvoiceStatusButton({
  invoiceId,
  currentStatus,
}: InvoiceStatusButtonProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateStatus = async (status: string) => {
    setIsUpdating(true);
    try {
      await updateInvoiceStatus(invoiceId, status);
      alert("Status updated successfully");
    } catch (error) {
      alert("Error updating status.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => handleUpdateStatus("paid")}
        disabled={isUpdating || currentStatus === "paid"}
        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition disabled:opacity-50"
      >
        {isUpdating ? "Updating..." : "Mark as Paid"}
      </button>

      <button
        onClick={() => handleUpdateStatus("unpaid")}
        disabled={isUpdating || currentStatus === "unpaid"}
        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition disabled:opacity-50"
      >
        {isUpdating ? "Updating..." : "Mark as Unpaid"}
      </button>

      <button
        onClick={() => handleUpdateStatus("overdue")}
        disabled={isUpdating || currentStatus === "overdue"}
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition disabled:opacity-50"
      >
        {isUpdating ? "Updating..." : "Mark as Overdue"}
      </button>
    </div>
  );
}
