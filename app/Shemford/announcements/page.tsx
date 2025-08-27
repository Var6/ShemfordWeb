"use client";

import { useEffect, useState } from "react";

export default function AnnouncementsAdmin() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [form, setForm] = useState({
    title: "",
    date: "",
    description: "",
    priority: "low",
    category: "",
  });
  const [files, setFiles] = useState<File[]>([]);

  async function fetchAnnouncements() {
    const res = await fetch("/api/announcements");
    const data = await res.json();
    setAnnouncements(data);
  }

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  async function uploadFiles() {
    if (!files.length) return [];
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    return res.json(); // [{url, name}]
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const uploadedFiles = await uploadFiles();

    await fetch("/api/announcements", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, files: uploadedFiles }),
    });

    setForm({
      title: "",
      date: "",
      description: "",
      priority: "low",
      category: "",
    });
    setFiles([]);
    fetchAnnouncements();
  }

  async function handleDelete(id: string) {
    await fetch(`/api/announcements/${id}`, { method: "DELETE" });
    fetchAnnouncements();
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Announcements</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input type="text" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="border p-2 w-full" />
        <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="border p-2 w-full" />
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="border p-2 w-full"></textarea>
        <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })} className="border p-2 w-full">
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <input type="text" placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="border p-2 w-full" />
        <input type="file" multiple onChange={(e) => setFiles(Array.from(e.target.files || []))} className="border p-2 w-full" />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Add Announcement</button>
      </form>

      <h2 className="text-xl font-semibold mb-4">Existing Announcements</h2>
      <ul>
        {announcements.map((a) => (
          <li key={a._id} className="border p-3 mb-2">
            <h3 className="font-bold">{a.title}</h3>
            <p>{a.date}</p>
            <p>{a.description}</p>
            {a.files && a.files.length > 0 && (
              <div>
                <h4 className="font-semibold mt-2">Files:</h4>
                <ul>
                  {a.files.map((file: any, index: number) => (
                    <li key={index}>
                      <a href={file.url} target="_blank" className="text-blue-600 underline">
                        {file.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <button onClick={() => handleDelete(a._id)} className="bg-red-500 text-white px-3 py-1 mt-2 rounded">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
