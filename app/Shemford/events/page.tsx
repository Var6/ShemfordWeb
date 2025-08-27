"use client";
import { useState } from "react";

export default function EventsAdminPage() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [venue, setVenue] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [featured, setFeatured] = useState(false);
  const [image, setImage] = useState("");
  const [registerLink, setRegisterLink] = useState("");
  const [organizer, setOrganizer] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, date, time, description, category, venue, capacity, featured, image, registerLink, organizer }),
    });
    const data = await res.json();
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <input type="text" placeholder="Event Title" value={title} onChange={(e) => setTitle(e.target.value)} className="border p-2" />
      <input type="text" placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} className="border p-2" />
      <input type="text" placeholder="Time" value={time} onChange={(e) => setTime(e.target.value)} className="border p-2" />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="border p-2" />
      <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2" />
      <input type="text" placeholder="Venue" value={venue} onChange={(e) => setVenue(e.target.value)} className="border p-2" />
      <input type="number" placeholder="Capacity" value={capacity} onChange={(e) => setCapacity(parseInt(e.target.value))} className="border p-2" />
      <input type="text" placeholder="Register Link" value={registerLink} onChange={(e) => setRegisterLink(e.target.value)} className="border p-2" />
      <input type="text" placeholder="Organizer" value={organizer} onChange={(e) => setOrganizer(e.target.value)} className="border p-2" />
      <input type="text" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} className="border p-2" />
      <label>
        Featured:
        <input type="checkbox" checked={featured} onChange={() => setFeatured(!featured)} />
      </label>
      <button type="submit" className="bg-blue-500 text-white p-2">Add Event</button>
    </form>
  );
}
