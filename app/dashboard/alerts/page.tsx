"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

export default function SecurityAlerts() {
  const [securityLogs, setSecurityLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch("/api/security-logs");
        const data = await res.json();
        if (data.success) {
          setSecurityLogs(data.logs); // Ensure correct key is used
        }
      } catch (error) {
        console.error("Error fetching security logs:", error);
      }
    };

    fetchLogs();
  }, []);

  const attackCounts = {
    "SQL Injection": 0,
    "XSS": 0,
    "Brute Force": 0,
    "Other": 0
  };

  securityLogs.forEach((log) => {
    const type = log.attackType || "Other";
    if (attackCounts[type] !== undefined) {
      attackCounts[type]++;
    } else {
      attackCounts["Other"]++;
    }
  });

  const chartData = Object.entries(attackCounts).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = ["#ff0000", "#ff8c00", "#00bfff", "#808080"];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Security Alerts</h1>

      <PieChart width={400} height={400}>
        <Pie data={chartData} cx={200} cy={200} outerRadius={150} fill="#8884d8" dataKey="value">
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
      
      <h2 className="text-2xl mt-6">Recent Security Logs</h2>
      <table className="w-full border-collapse border border-gray-300 mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">IP Address</th>
            <th className="border border-gray-300 p-2">User Agent</th>
            <th className="border border-gray-300 p-2">Time</th>
            <th className="border border-gray-300 p-2">Attack Type</th>
          </tr>
        </thead>
        <tbody>
          {securityLogs.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center p-4">No security logs found.</td>
            </tr>
          ) : (
            securityLogs.map((log, index) => (
              <tr key={index} className="border border-gray-300">
                <td className="border border-gray-300 p-2">{log.email || "N/A"}</td>
                <td className="border border-gray-300 p-2">{log.ipAddress || "Unknown"}</td>
                <td className="border border-gray-300 p-2">{log.userAgent || "Unknown"}</td>
                <td className="border border-gray-300 p-2">{new Date(log.timestamp).toLocaleString()}</td>
                <td className={`border border-gray-300 p-2 font-bold ${log.attackType ? "text-red-500" : "text-green-600"}`}>
                  {log.attackType || "Normal"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
