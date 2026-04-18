"use client";
import { useState, useEffect, useRef } from "react";
import { Edit2, Trash2, X, Check, UploadCloud, ImageIcon } from "lucide-react";

/* ── Image uploader ── */
function ImageUploader({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  function handleFile(file: File) {
    setError(""); setUploading(true); setProgress(0);
    const fd = new FormData();
    fd.append("files", file);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/upload");
    xhr.upload.onprogress = (e) => { if (e.lengthComputable) setProgress(Math.round((e.loaded / e.total) * 100)); };
    xhr.onload = () => {
      setUploading(false);
      if (xhr.status === 200) { onChange(JSON.parse(xhr.responseText).url); }
      else setError("Upload failed.");
    };
    xhr.onerror = () => { setUploading(false); setError("Upload failed."); };
    xhr.send(fd);
  }

  return (
    <div className="space-y-2">
      <input ref={inputRef} type="file" accept="image/*" className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ""; }} />
      {value ? (
        <div className="relative w-32 h-36 rounded-xl overflow-hidden border border-gray-300 dark:border-gray-600 bg-gray-100">
          <img src={value} alt="preview" className="w-full h-full object-cover" />
          <button type="button" onClick={() => onChange("")}
            className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-0.5"><X className="w-3 h-3" /></button>
          <button type="button" onClick={() => inputRef.current?.click()}
            className="absolute bottom-1 right-1 bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
            <UploadCloud className="w-2.5 h-2.5" /> Change
          </button>
        </div>
      ) : (
        <button type="button" onClick={() => inputRef.current?.click()} disabled={uploading}
          className="w-32 h-36 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-blue-500 hover:text-blue-500 transition disabled:opacity-50">
          {uploading ? <UploadCloud className="w-7 h-7 animate-bounce" /> : <ImageIcon className="w-7 h-7" />}
          <span className="text-xs text-center leading-tight">{uploading ? `${progress}%` : "Upload Photo"}</span>
        </button>
      )}
      {uploading && (
        <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
          <div className="bg-blue-500 h-1.5 rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>
      )}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

type Topper = {
  _id: string;
  name: string;
  class: string;
  section: string;
  percentage: string;
  rank: number;
  year: string;
  category: "Class Topper" | "CBSE Board";
  subject: string;
  photo: string;
  message: string;
};

const emptyForm = {
  name: "", class: "", section: "", percentage: "", rank: 1,
  year: new Date().getFullYear() - 1 + "-" + String(new Date().getFullYear()).slice(-2),
  category: "Class Topper" as const, subject: "Overall", photo: "", message: "",
};

const CLASSES = ["1","2","3","4","5","6","7","8","9","10","11","12"];
const YEARS = Array.from({ length: 5 }, (_, i) => {
  const y = new Date().getFullYear() - i;
  return `${y - 1}-${String(y).slice(-2)}`;
});

const inputCls = "border border-gray-300 dark:border-gray-600 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm";
const labelCls = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

const rankMedal: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" };

export default function ToppersAdminPage() {
  const [toppers, setToppers] = useState<Topper[]>([]);
  const [form, setForm] = useState({ ...emptyForm });
  const [editForm, setEditForm] = useState<Topper | null>(null);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<"All" | "Class Topper" | "CBSE Board">("All");

  useEffect(() => { fetchToppers(); }, []);

  async function fetchToppers() {
    const res = await fetch("/api/toppers");
    setToppers(await res.json());
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault(); setLoading(true);
    try {
      const res = await fetch("/api/toppers", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error();
      alert("Topper added!"); setForm({ ...emptyForm }); await fetchToppers();
    } catch { alert("Failed to add."); } finally { setLoading(false); }
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault(); if (!editForm) return; setLoading(true);
    try {
      const res = await fetch(`/api/toppers/${editForm._id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editForm) });
      if (!res.ok) throw new Error();
      alert("Updated!"); setEditForm(null); await fetchToppers();
    } catch { alert("Failed to update."); } finally { setLoading(false); }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this topper?")) return; setLoading(true);
    try {
      await fetch(`/api/toppers/${id}`, { method: "DELETE" });
      await fetchToppers();
    } catch { alert("Failed to delete."); } finally { setLoading(false); }
  }

  const filtered = filter === "All" ? toppers : toppers.filter(t => t.category === filter);

  function FormFields({ data, set }: { data: typeof emptyForm | Topper; set: (d: any) => void }) {
    return (
      <div className="space-y-4">
        <div className="flex gap-4 items-start">
          <div>
            <label className={labelCls}>Photo <span className="text-red-500">*</span></label>
            <ImageUploader value={data.photo} onChange={(url) => set({ ...data, photo: url })} />
          </div>
          <div className="flex-1 space-y-3">
            <div>
              <label className={labelCls}>Student Name <span className="text-red-500">*</span></label>
              <input type="text" value={data.name} onChange={(e) => set({ ...data, name: e.target.value })}
                className={inputCls} placeholder="Full name" required />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Category <span className="text-red-500">*</span></label>
                <select value={data.category} onChange={(e) => set({ ...data, category: e.target.value as any })} className={inputCls}>
                  <option value="Class Topper">Class Topper</option>
                  <option value="CBSE Board">CBSE Board</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Class <span className="text-red-500">*</span></label>
                <select value={data.class} onChange={(e) => set({ ...data, class: e.target.value })} className={inputCls} required>
                  <option value="">Select…</option>
                  {CLASSES.map(c => <option key={c} value={c}>Class {c}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className={labelCls}>Section</label>
                <input type="text" value={data.section} onChange={(e) => set({ ...data, section: e.target.value })}
                  className={inputCls} placeholder="A / B / C" maxLength={2} />
              </div>
              <div>
                <label className={labelCls}>Rank</label>
                <select value={data.rank} onChange={(e) => set({ ...data, rank: Number(e.target.value) })} className={inputCls}>
                  <option value={1}>🥇 1st</option>
                  <option value={2}>🥈 2nd</option>
                  <option value={3}>🥉 3rd</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Year <span className="text-red-500">*</span></label>
                <select value={data.year} onChange={(e) => set({ ...data, year: e.target.value })} className={inputCls}>
                  {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Score / Percentage <span className="text-red-500">*</span></label>
            <input type="text" value={data.percentage} onChange={(e) => set({ ...data, percentage: e.target.value })}
              className={inputCls} placeholder="e.g. 98.6% or 495/500" required />
          </div>
          <div>
            <label className={labelCls}>Subject</label>
            <input type="text" value={data.subject} onChange={(e) => set({ ...data, subject: e.target.value })}
              className={inputCls} placeholder="Overall / Mathematics / Science…" />
          </div>
        </div>

        <div>
          <label className={labelCls}>Student's Message <span className="text-gray-400 text-xs">(optional)</span></label>
          <textarea value={data.message} onChange={(e) => set({ ...data, message: e.target.value })}
            className={inputCls} rows={2} placeholder="Motivational quote or achievement note…" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">🏅 Toppers Management</h1>

        {/* ── Add Form ── */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Add New Topper</h2>
          <form onSubmit={handleAdd}>
            <FormFields data={form} set={setForm} />
            <button type="submit" disabled={loading || !form.photo || !form.name || !form.class || !form.percentage}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold px-6 py-3 rounded-xl transition">
              {loading ? "Adding…" : "✚ Add Topper"}
            </button>
          </form>
        </div>

        {/* ── List ── */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">All Toppers ({toppers.length})</h2>
            <div className="flex gap-2">
              {(["All", "Class Topper", "CBSE Board"] as const).map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${filter === f ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200'}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <p className="text-center text-gray-400 py-12">No toppers yet. Add one above!</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((t) => (
                <div key={t._id} className="flex gap-3 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition bg-gray-50 dark:bg-gray-700">
                  <img src={t.photo} alt={t.name} className="w-16 h-20 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 mb-0.5">
                      <span className="text-lg">{rankMedal[t.rank] || "🎖️"}</span>
                      <span className="font-bold text-gray-900 dark:text-white text-sm truncate">{t.name}</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Class {t.class}{t.section ? ` - ${t.section}` : ""}</p>
                    <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">{t.percentage}</p>
                    <span className={`inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full font-medium ${t.category === "CBSE Board" ? "bg-purple-100 text-purple-700" : "bg-green-100 text-green-700"}`}>
                      {t.category}
                    </span>
                    <p className="text-[10px] text-gray-400 mt-0.5">{t.year}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <button onClick={() => setEditForm({ ...t })} className="bg-blue-500 hover:bg-blue-600 text-white p-1.5 rounded-lg"><Edit2 className="w-3.5 h-3.5" /></button>
                    <button onClick={() => handleDelete(t._id)} disabled={loading} className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Edit Modal ── */}
        {editForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Edit Topper</h2>
                <button onClick={() => setEditForm(null)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
                  <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
              <form onSubmit={handleUpdate} className="p-6">
                <FormFields data={editForm} set={setEditForm} />
                <div className="flex gap-3 mt-6">
                  <button type="submit" disabled={loading}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold px-6 py-3 rounded-xl transition flex items-center justify-center gap-2">
                    <Check className="w-4 h-4" />{loading ? "Saving…" : "Save Changes"}
                  </button>
                  <button type="button" onClick={() => setEditForm(null)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-white font-bold px-6 py-3 rounded-xl transition">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
