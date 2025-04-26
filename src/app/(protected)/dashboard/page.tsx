"use client"; 
import { useState, useEffect } from "react";
import { Card, CardContent } from "../../components/ui/card";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
export default function DashboardPage() {
  ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const page = Number(searchParams?.get("page")) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/dashboard`);
        // console.log("res", await res.json());
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const { revenueData, users, totalUsers, unpaidInvoices, outstandingBalance } =
    data;
  console.log("revenueData", revenueData);
  const revenueChartData = {
    labels: Object.keys(revenueData), // e.g. ["Jan 2024", "Feb 2024"]
    datasets: [
      {
        label: "Revenue",
        data: Object.values(revenueData), // [5000, 3000, 4000]
        backgroundColor: "#3B82F6", // Tailwind blue
      },
    ],
  };
  const revenueChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Revenue Over Time",
      },
    },
  };

  const totalPages = Math.ceil(totalUsers / limit);
  console.log("customers", users);
  return (
    <div className="p-6 space-y-6 text-black">
      {loading && (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-600 text-lg">Loading dashboard...</p>
        </div>
      )}
      {!data && (
        <div className="flex justify-center items-center h-64">
          <p className="text-red-500">Failed to load dashboard data.</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent>
            <p className="text-m font-semibold">Total Customers</p>
            <h2 className="text-2xl font-bold">{totalUsers}</h2>
          </CardContent>
        </Card>

        <Card className="flex justify-between">
          <CardContent>
            <p className="text-m font-semibold">Outstanding Invoices</p>
            <h2 className="text-2xl font-bold">{unpaidInvoices}</h2>
          </CardContent>
          <CardContent>
            <p className="text-m font-semibold">Outstanding Balance</p>
            <h2 className="text-2xl font-bold">
              ${outstandingBalance.toFixed(2)}
            </h2>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-m font-semibold">Revenue Trends</p>
            <div className="h-64">
              <Bar data={revenueChartData} options={revenueChartOptions} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer List */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-2">Customers</h2>
        <ul className="divide-y divide-gray-200">
          <li
            key={"header"}
            className="py-2 bg-gray-200 font-semibold text-xl flex justify-between"
          >
            <p>Name</p>
            <p>Email</p>
            <p>Status</p>
          </li>
          {users ? (
            users.map((user: any) => (
              <li key={user.id} className="py-2 flex justify-between">
                <Link
                  href={`/customer/${user.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {user.name}
                </Link>
                <p>{user.email}</p>
                <p>{user.email ? "ACTIVE" : "NOT ACTIVE"}</p>
              </li>
            ))
          ) : (
            <p className="text-red-500">No User found.</p>
          )}
        </ul>

        <div className="mt-4 flex justify-center gap-2">
          {totalPages ? (
            [...Array(totalPages)].map((_, i) => (
              <Link
                key={i}
                href={`?page=${i + 1}`}
                className={`px-3 py-1 rounded ${
                  i + 1 === page ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                {i + 1}
              </Link>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
