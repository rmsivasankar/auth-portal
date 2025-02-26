"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



// Sample top executives data
const executives = [
  { id: 1, name: 'Albert Wesker', title: 'CEO', image: '/avatar/1.jpg' },
  { id: 2, name: 'William Birkin', title: 'Lead Scientist', image: '/avatar/2.png' },
  { id: 3, name: 'James Marcus', title: 'Founder', image: '/avatar/3.png' },
  { id: 4, name: 'Osmund Saddler', title: 'Executive Officer', image: '/avatar/4.jpg' },
  
];

export default function UserDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (status === "loading") return; // Wait until session loads

    if (!session) {
      router.replace("/auth/login"); // Redirect only if not logged in
    } else if (session.user.role === "ADMIN") {
      router.replace("/dashboard/admin"); // Redirect admins to their dashboard
    } else {
      setIsAuthorized(true); // Set authorization only for users
    }
  }, [session, status, router]);

  if (status === "loading" || !isAuthorized) return <div>Loading...</div>;

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-red-600">User  Dashboard</h1>
      <p className="mb-4 text-gray-300">Welcome, {session?.user.email}. You are logged in as a user.</p>

      <h2 className="text-2xl font-semibold mb-4 text-white">About Umbrella Corporation</h2>
      <p className="text-gray-300 mb-6">
        The Umbrella Corporation is a multinational pharmaceutical and biotechnology company. 
        It is known for its research and development of bioweapons and has been involved in various 
        unethical experiments. The company has a significant influence in the world of bioengineering.
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-white">Top Executives</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {executives.map(executive => (
          <div key={executive.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
            <Image src={executive.image} alt={executive.name} className="w-full h-32 object-cover rounded-md mb-2" width={200} height={400} />
            <h3 className="text-lg font-semibold text-white">{executive.name}</h3>
            <p className="text-gray-400">{executive.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}