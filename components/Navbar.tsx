"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="p-4 bg-gray-900 shadow-md flex justify-between items-center mb-2">
      <div className="flex gap-2">
        <Image 
          src="https://static.wikia.nocookie.net/residentevil/images/c/c6/Umbrellaemblem.png/revision/latest/scale-to-width/360?cb=20240618173832" 
          alt="Umbrella Corporation Logo" 
          width={30} 
          height={30} 
        />
        <Link href="/" className="text-2xl font-bold text-red-600 hover:text-red-400 transition duration-200">Umbrella Corporation</Link>
      </div>
      <div className="flex items-center">
        {session ? (
          <>
            <Link href="/dashboard" className="mr-6 text-gray-300 hover:text-red-500 transition duration-200">Dashboard</Link>
            <button 
              onClick={() => signOut()} 
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/auth/login" className="mr-6 text-red-400 font-semibold hover:text-red-300 transition duration-200">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}