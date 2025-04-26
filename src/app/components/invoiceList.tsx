"use client";

import { useEffect, useState } from "react";
import InvoiceSearchFilter from "./invoiceSearchFilter";
import { getInvoices } from "../actions/getInvoices";

export default function InvoiceList() {
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState(invoices);

  useEffect(() => {
    async function fetchInvoices() {
      const data = await getInvoices();
      setInvoices(data);
      setFilteredInvoices(data);
    }

    fetchInvoices();
  }, []);

  const handleFilterChange = (searchTerm: string, status: string) => {
    const filtered = invoices.filter(
      (invoice) =>
        (searchTerm ? invoice.customerName.includes(searchTerm) : true) &&
        (status ? invoice.status === status : true)
    );
    setFilteredInvoices(filtered);
  };

  return (
    <div>
      <InvoiceSearchFilter onFilterChange={handleFilterChange} />
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredInvoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.customerName}</td>
              <td>{invoice.amount}</td>
              <td>{invoice.status}</td>
              <td>{new Date(invoice.dueDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
