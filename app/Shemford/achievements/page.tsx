"use client";
import { useState, useEffect } from "react";

type Achievement = {
  _id: string;
  title: string;
  description: string;
  details: string;
  image: string;
  icon: string;
  gradient: string;
  color: string;
};

export default function AchievementsAdminPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [form, setForm] = useState<Omit<Achievement, "_id">>({
    title: "",
    description: "",
    details: "",
    image: "",
    icon: "",
    gradient: "",
    color: "",
  });

  // load data
  useEffect(() => {
    fetchAchievements();
  }, []);

  async function fetchAchievements() {
    const res = await fetch("/api/achievements");
    const data = await res.json();
    setAchievements(data);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/achievements", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    await res.json();
    setForm({ title: "", description: "", details: "", image: "", icon: "", gradient: "", color: "" });
    fetchAchievements();
  }

  async function handleUpdate(id: string, updated: Partial<Achievement>) {
    await fetch(`/api/achievements/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    fetchAchievements();
  }

  async function handleDelete(id: string) {
    await fetch(`/api/achievements/${id}`, { method: "DELETE" });
    fetchAchievements();
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Achievements Admin</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-2 border p-4 rounded">
        <input type="text" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="border p-2 w-full" />
        <input type="text" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="border p-2 w-full" />
        <textarea placeholder="Details" value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} className="border p-2 w-full" />
        <input type="text" placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="border p-2 w-full" />
        <input type="text" placeholder="Icon Name" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className="border p-2 w-full" />
        <input type="text" placeholder="Gradient" value={form.gradient} onChange={(e) => setForm({ ...form, gradient: e.target.value })} className="border p-2 w-full" />
        <input type="text" placeholder="Color" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} className="border p-2 w-full" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Add Achievement</button>
      </form>

      {/* List */}
      <div className="space-y-4">
        {achievements.map((ach) => (
          <div key={ach._id} className="border p-4 rounded flex justify-between items-center">
            <div>
              <h2 className="font-semibold">{ach.title}</h2>
              <p className="text-sm">{ach.description}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleUpdate(ach._id, { title: ach.title + " (Edited)" })}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(ach._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
