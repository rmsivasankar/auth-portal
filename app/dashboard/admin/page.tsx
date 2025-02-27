"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import Image from "next/image";

// Register the necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (status === "loading") return; // Wait until session loads

    if (!session) {
      router.replace("/auth/login"); // Redirect only if not logged in
    } else if (session.user.role === "USER") {
      router.replace("/dashboard/user"); // Redirect users to their dashboard
    } else {
      setIsAuthorized(true); // Set authorization only for admins
    }
  }, [session, status, router]);

  if (status === "loading" || !isAuthorized) return <div>Loading...</div>;

  // Sample data for the pie chart
  const inventoryData = {
    labels: ['Assault Rifles', 'Pistols', 'Shotguns', 'Sniper Rifles'],
    datasets: [
      {
        label: 'Weapons Inventory',
        data: [300, 150, 100, 50],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Sample weapon data for the inventory
  const weapons = [
    { id: 1, name: 'AK-47', image: '/weapons/1.jpeg', status: 'In Stock' },
    { id: 2, name: 'Glock 17', image: '/weapons/2.jpg', status: 'In Stock' },
    { id: 3, name: 'Remington 870', image: '/weapons/1.jpeg', status: 'Out of Stock' },
    { id: 4, name: 'M24 Sniper', image: '/weapons/2.jpg', status: 'In Stock' },
  ];

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-red-600">Weapons Inventory Dashboard</h1>
      <p className="mb-4 text-gray-300">Welcome, {session?.user.email}. You have admin privileges.</p>

      <h2 className="text-2xl font-semibold mb-4 text-white">Weapons Inventory Overview</h2>
      <div className="mb-6">
        <div className="w-full max-w-md mx-auto">
          <Pie data={inventoryData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-white">Available Weapons</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {weapons.map(weapon => (
          <div key={weapon.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
            <Image src={weapon.image} alt={weapon.name} className="w-full h-32 object-cover rounded-md mb-2" width={200} height={400} />
            <h3 className="text-lg font-semibold text-white">{weapon.name}</h3>
            <p className="text-gray-400">{weapon.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}