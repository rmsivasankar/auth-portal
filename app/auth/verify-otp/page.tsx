"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [otpSent, setOtpSent] = useState(false);

    const handleEmailSubmit = async () => {
        setErrorMessage("");
        const res = await fetch("/api/auth/generate-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        const data = await res.json();
        if (res.ok) setOtpSent(true);
        else setErrorMessage(data.error || "Failed to send OTP");
    };

    const handleOTPSubmit = async () => {
        setErrorMessage("");
        const res = await fetch("/api/auth/verify-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, otp }),
        });

        const data = await res.json();
        if (res.ok) router.push("/dashboard/user");
        else setErrorMessage(data.error || "Invalid OTP");
    };

    return (
        <div className="flex min-h-screen">
            <div className="w-1/2 bg-cover bg-center"
                style={{ backgroundImage: "url('https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?t=st=1740548641~exp=1740552241~hmac=9057ecfb63c522ceb391408c5ab931148e30a31278dda90d33f6431628f1d46b&w=740')" }}>
            </div>

            <div className="flex items-center justify-center w-1/2 bg-white shadow-lg rounded-lg p-8">
                <div className="w-full max-w-md">
                    <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Login</h2>

                    {errorMessage && (
                        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                            <span>{errorMessage}</span>
                        </div>
                    )}

                    {!otpSent ? (
                        <>
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button
                                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
                                onClick={handleEmailSubmit}
                            >
                                Send OTP
                            </button>
                        </>
                    ) : (
                        <>
                            <input
                                type="text"
                                placeholder="Enter OTP"
                                className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                            />
                            <button
                                className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition"
                                onClick={handleOTPSubmit}
                            >
                                Verify OTP
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
