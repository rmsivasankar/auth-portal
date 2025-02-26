"use client";

import { useEffect, useState } from "react";

export default function SecurityAlerts() {
  const [alerts, setAlerts] = useState<{ type: string; message: string; count: number }[]>([
    { type: "SQL Injection", message: "Attempted SQL query detected.", count: 0 },
    { type: "DDoS", message: "Multiple rapid requests from the same IP.", count: 0 },
    { type: "URL Tampering", message: "User attempted to modify query parameters.", count: 0 },
  ]);

  const [clickCount, setClickCount] = useState(0);
  const [lastSearch, setLastSearch] = useState("");

  // Function to update alerts and store them in the database
  const addAlert = (alertType: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.type === alertType ? { ...alert, count: alert.count + 1 } : alert
      )
    );

    // Send the alert data to the backend API for storage
    fetch("/api/security-logs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: alertType, timestamp: new Date().toISOString() }),
    }).catch((err) => console.error("Error logging security alert:", err));
  };

  useEffect(() => {
    // Track excessive clicks (potential DDoS behavior)
    const handleClick = () => {
      setClickCount((prev) => prev + 1);
    };

    document.addEventListener("click", handleClick);

    // Monitor URL tampering
    const checkURLTampering = () => {
      if (window.location.search !== lastSearch) {
        addAlert("URL Tampering");
        setLastSearch(window.location.search);
      }
    };

    const urlObserver = new MutationObserver(checkURLTampering);
    urlObserver.observe(document.documentElement, { subtree: true, childList: true });

    return () => {
      document.removeEventListener("click", handleClick);
      urlObserver.disconnect();
    };
  }, [lastSearch]);

  useEffect(() => {
    // If clicks exceed a threshold, trigger a DDoS alert
    if (clickCount > 10) {
      addAlert("DDoS");
      setClickCount(0); // Reset count after triggering an alert
    }
  }, [clickCount]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const sqlInjectionPattern = /(\b(SELECT|INSERT|DELETE|UPDATE|DROP|--|#|\*|')\b)/gi;

    if (sqlInjectionPattern.test(inputValue)) {
      addAlert("SQL Injection");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Security Alerts</h1>
      <p className="text-gray-600 mb-4">Monitoring user interactions for security threats.</p>

      {/* Simulated User Input Field */}
      <input
        type="text"
        placeholder="Enter something..."
        onChange={handleInputChange}
        className="border p-2 mb-4 w-full rounded-lg"
      />

      {/* Security Alerts Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2 text-left">Attack Type</th>
            <th className="border border-gray-300 p-2 text-left">Message</th>
            <th className="border border-gray-300 p-2 text-left">Count</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map((alert, index) => (
            <tr key={index} className="border border-gray-300">
              <td className="border border-gray-300 p-2">{alert.type}</td>
              <td className="border border-gray-300 p-2">{alert.message}</td>
              <td className="border border-gray-300 p-2">{alert.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
