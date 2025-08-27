"use client";

import { useEffect, useState } from "react";

export default function FacultiesAdmin() {
  const [faculties, setFaculties] = useState<any[]>([]);
  const [form, setForm] = useState({
    name: "",
    subject: "",
    achievements: "",
    experience: "",
    joinedDate: "",
    bio: "",
    message: "",
    profileUrl: "",
  });
  const [file, setFile] = useState<File | null>(null);

  async function fetchFaculties() {
    const res = await fetch("/api/faculties");
    const data = await res.json();
    setFaculties(data);
  }

  useEffect(() => {
    fetchFaculties();
  }, []);

  async function handleUpload() {
    if (!file) return null;
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    return data.secure_url; // Cloudinary URL
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    let profileUrl = form.profileUrl;

    if (file) {
      profileUrl = await handleUpload();
    }

    await fetch("/api/faculties", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, profileUrl }),
    });

    setForm({
      name: "",
      subject: "",
      achievements: "",
      experience: "",
      joinedDate: "",
      bio: "",
      message: "",
      profileUrl: "",
    });
    setFile(null);
    fetchFaculties();
  }

  async function handleDelete(id: string) {
    await fetch(`/api/faculties/${id}`, { method: "DELETE" });
    fetchFaculties();
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Faculties</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="border p-2 w-full" />
        <input type="text" placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="border p-2 w-full" />
        <input type="text" placeholder="Achievements" value={form.achievements} onChange={(e) => setForm({ ...form, achievements: e.target.value })} className="border p-2 w-full" />
        <input type="text" placeholder="Experience" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} className="border p-2 w-full" />
        <input type="text" placeholder="Joined Date" value={form.joinedDate} onChange={(e) => setForm({ ...form, joinedDate: e.target.value })} className="border p-2 w-full" />
        <textarea placeholder="Bio" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} className="border p-2 w-full" rows={3}></textarea>
        <textarea placeholder="Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="border p-2 w-full" rows={3}></textarea>
        <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} className="border p-2 w-full" />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Add Faculty</button>
      </form>

      <h2 className="text-xl font-semibold mb-4">Existing Faculties</h2>
      <ul>
        {faculties.map((f) => (
          <li key={f._id} className="border p-3 mb-2 flex justify-between items-center">
            <div>
              <img src={f.profileUrl} alt={f.name} className="w-16 h-16 rounded-full mb-2" />
              <p><strong>{f.name}</strong> ({f.subject})</p>
            </div>
            <button onClick={() => handleDelete(f._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
