"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [error, setError] = useState("");
  const [allowed, setAllowed] = useState(false);

  const allowedIPs = "::1";

  useEffect(() => {
    const checkIP = async () => {
      try {
        let userIP = "::1";


        const res = await fetch("/api/get-ip");
        const data = await res.json();
        userIP = data.ip;

        if (!userIP || userIP === "Unknown IP") {
          const externalRes = await fetch("https://api.ipify.org?format=json");
          const externalData = await externalRes.json();
          userIP = externalData.ip;
        }

        console.log("Detected IPv4:", userIP);

        setAllowed(allowedIPs.includes(userIP));
      } catch (err) {
        console.error("Error fetching IP:", err);
        setAllowed(false);
      }
    };

    checkIP();
  }, []);

  if (!allowed) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500 text-2xl">
        Access Denied
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      if (res.ok) {
        router.push("/auth/login");
      } else {
        const data = await res.json();
        setError(data.error || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Image Section */}
      <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('https://pure4runner.com/images/pureumbrella.jpg')" }}></div>

      {/* Right Form Section */}
      <div className="flex items-center justify-center w-1/2 bg-white shadow-lg rounded-lg p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Signup</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="USER">User </option>
              <option value="ADMIN">Admin</option>
            </select>
            <button 
              type="submit" 
              className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Signup
            </button>
            {error && <p className="text-red-500 text-center">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
