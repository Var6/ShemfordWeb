"use client";

import { useState, useEffect } from "react";

export default function CalendarAdmin() {
  const [activeTab, setActiveTab] = useState<"holiday" | "vacation" | "notice">("holiday");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchItems = async () => {
    const res = await fetch("/api/calendar");
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const payload: any = {};
    formData.forEach((value, key) => (payload[key] = value));
    payload.type = activeTab;

    await fetch("/api/calendar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);
    e.currentTarget.reset();
    fetchItems();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Calendar Management</h1>
      
      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {["holiday", "vacation", "notice"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 rounded ${activeTab === tab ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid gap-4 mb-6 max-w-xl">
        <input type="text" name="title" placeholder="Title" className="border p-2 rounded" required />
        <textarea name="description" placeholder="Description" className="border p-2 rounded"></textarea>

        {activeTab === "holiday" && (
          <>
            <input type="text" name="date" placeholder="Date (e.g. March 20, 2025)" className="border p-2 rounded" />
            <select name="category" className="border p-2 rounded">
              <option value="">Select Category</option>
              <option value="religious">Religious</option>
              <option value="national">National</option>
              <option value="cultural">Cultural</option>
              <option value="educational">Educational</option>
              <option value="celebration">Celebration</option>
            </select>
          </>
        )}

        {activeTab === "vacation" && (
          <>
            <input type="text" name="start" placeholder="Start Date" className="border p-2 rounded" />
            <input type="text" name="end" placeholder="End Date" className="border p-2 rounded" />
            <input type="text" name="reopen" placeholder="Reopen Date" className="border p-2 rounded" />
          </>
        )}

        {activeTab === "notice" && (
          <>
            <select name="priority" className="border p-2 rounded">
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
            {/* File upload will be here */}
            <input type="file" name="file" className="border p-2 rounded" />
          </>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </form>

      {/* Display items */}
      <div>
        <h2 className="text-xl font-bold mb-4">All Entries</h2>
        <ul className="space-y-2">
          {items.map((item: any) => (
            <li key={item._id} className="border p-4 rounded flex justify-between items-center">
              <div>
                <p className="font-bold">{item.title}</p>
                <p className="text-sm">{item.type}</p>
              </div>
              <button
                onClick={async () => {
                  await fetch("/api/calendar", {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: item._id }),
                  });
                  fetchItems();
                }}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
