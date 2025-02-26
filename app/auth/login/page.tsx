"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import GitHubAuthButton from "@/components/GitHubAuthButton";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Store error message
  const [attempts, setAttempts] = useState(0); // Track login attempts
  const maxAttempts = 3; // Maximum allowed attempts

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(""); // Reset previous error

    if (attempts >= maxAttempts) {
      setErrorMessage("Maximum login attempts exceeded. Please try again later.");
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.ok) {
      // Fetch session to get role and redirect
      const sessionRes = await fetch("/api/auth/session");
      const session = await sessionRes.json();
      const role = session?.user?.role;

      if (role === "ADMIN") {
        router.push("/dashboard/admin");
      } else {
        router.push("/dashboard/user");
      }
    } else {
      setAttempts(prev => prev + 1); // Increment attempts on failure
      setErrorMessage("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Image Section */}
      <div className="w-1/2 bg-cover bg-center" 
        style={{ backgroundImage: "url('https://pure4runner.com/images/pureumbrella.jpg')" }}>
      </div>

      {/* Right Form Section */}
      <div className="flex items-center justify-center w-1/2 bg-white shadow-lg rounded-lg p-8">
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Login</h2>

          {/* Error Alert */}
          {errorMessage && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{errorMessage}</span>
              <button 
                onClick={() => setErrorMessage("")} 
                className="absolute top-0 bottom-0 right-0 px-4 py-3"
              >
                ✕
              </button>
            </div>
          )}

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-200"
            disabled={attempts >= maxAttempts} // Disable button if max attempts reached
          >
            Login
          </button>

          <GitHubAuthButton />
        </form>
      </div>
    </div>
  );
}