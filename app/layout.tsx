"use client";

import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <html lang="en">
        <body>
          <Navbar />
          <main className="p-4">{children}</main>
        </body>
      </html>
    </SessionProvider>
  );
}
