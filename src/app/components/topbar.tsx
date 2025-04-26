"use client";
import Link from "next/link";
import LogoutButton from "../components/button";
import { usePathname } from "next/navigation";

export default function Topbar() {
  const navLinks = [
    { name: "Dashboard", href: "/dashboard" },
    // { name: "Customers", href: "/" },
  ];
  const pathname = usePathname();

  return (
    <div className="bg-white shadow-sm p-4 border-b text-black flex items-center justify-between">
      <h1 className="text-xl font-bold">📦 Invoicer</h1>
      <div className="flex items-center space-x-4">
        {navLinks.map(({ name, href }) => (
          <Link
            key={name}
            href={href}
            className={`px-4 py-2 rounded-md transition-colors duration-200 ${
              pathname === href
                ? "bg-blue-500 text-white"
                : "text-gray-700 hover:bg-blue-100"
            }`}
          >
            {name}
          </Link>
        ))}
        <LogoutButton />
      </div>
    </div>
  );
}
