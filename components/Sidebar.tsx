"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Sidebar() {
  const { data: session } = useSession();

  return (
    <aside className="w-64 h-screen bg-gray-800 shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-red-600 mb-6">Dashboard</h2>
      <ul className="space-y-4">
        {session?.user.role === "ADMIN" && (
          <>
            <li>
              <Link href="/dashboard/admin" className="block p-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition duration-200">
                Admin Panel
              </Link>
            </li>
            <li>
              <Link href="/dashboard/alerts" className="block p-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition duration-200">
                Security Alerts
              </Link>
            </li>
          </>
        )}
        {session?.user.role === "USER" && (
          <li>
            <Link href="/dashboard/user" className="block p-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition duration-200">
              User Dashboard
            </Link>
          </li>
        )}
        <li>
          <Link href="/dashboard" className="block p-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition duration-200">
            Home
          </Link>
        </li>
      </ul>
    </aside>
  );
}