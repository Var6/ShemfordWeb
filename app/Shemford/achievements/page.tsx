"use client";
import { useState } from "react";

export default function AchievementsAdminPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState("");
  const [image, setImage] = useState("");
  const [icon, setIcon] = useState("");
  const [gradient, setGradient] = useState("");
  const [color, setColor] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/achievements", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, details, image, icon, gradient, color }),
    });
    const data = await res.json();
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="border p-2" />
      <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="border p-2" />
      <textarea placeholder="Details" value={details} onChange={(e) => setDetails(e.target.value)} className="border p-2" />
      <input type="text" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} className="border p-2" />
      <input type="text" placeholder="Icon Name" value={icon} onChange={(e) => setIcon(e.target.value)} className="border p-2" />
      <input type="text" placeholder="Gradient" value={gradient} onChange={(e) => setGradient(e.target.value)} className="border p-2" />
      <input type="text" placeholder="Color" value={color} onChange={(e) => setColor(e.target.value)} className="border p-2" />
      <button type="submit" className="bg-green-500 text-white p-2">Add Achievement</button>
    </form>
  );
}
