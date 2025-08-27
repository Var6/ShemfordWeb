"use client";

import { useState, useEffect } from "react";

export default function AdminPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if already logged in
    const loggedIn = localStorage.getItem("admin_logged_in");
    if (loggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (username === "Shemford" && password === "India@1947") {
      localStorage.setItem("admin_logged_in", "true");
      setIsLoggedIn(true);
    } else {
      setError("Invalid username or password");
    }
  }

  function handleLogout() {
    localStorage.removeItem("admin_logged_in");
    setIsLoggedIn(false);
  }

  if (!isLoggedIn) {
    // Show login form
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-80">
          <h2 className="text-xl font-bold mb-4">Admin Login</h2>
          <input
            type="text"
            placeholder="Username"
            className="border p-2 w-full mb-3"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2 w-full mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded">
            Login
          </button>
        </form>
      </div>
    );
  }

  // Show admin dashboard if logged in
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Welcome to Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Admin actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Manage Content</h2>
        <p>You can add your CRUD functionality here (messages, banners, etc.)</p>
      </div>
    </div>
  );
}
