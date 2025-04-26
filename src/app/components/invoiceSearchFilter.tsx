"use client";

import { useState } from "react";

export default function InvoiceSearchFilter({ onFilterChange }: any) {
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onFilterChange(e.target.value, status);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
    onFilterChange(searchTerm, e.target.value);
  };

  return (
    <div className="flex space-x-4 mb-4">
      <input
        type="text"
        placeholder="Search by customer"
        value={searchTerm}
        onChange={handleSearchChange}
        className="p-2 border border-gray-300 rounded"
      />
      <select
        value={status}
        onChange={handleStatusChange}
        className="p-2 border border-gray-300 rounded"
      >
        <option value="">All Status</option>
        <option value="paid">Paid</option>
        <option value="unpaid">Unpaid</option>
        <option value="overdue">Overdue</option>
      </select>
    </div>
  );
}
