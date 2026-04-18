"use client";
import { useState, useEffect, useRef } from "react";
import { Edit2, Trash2, X, Check, UploadCloud, ImageIcon, Plus } from "lucide-react";

/* ── Color themes ── */
export const SCHEMES = [
  { label: "Ocean Blue",  css: "linear-gradient(135deg,#2563eb,#4338ca)", hex: "#2563eb" },
  { label: "Purple Rose", css: "linear-gradient(135deg,#9333ea,#db2777)", hex: "#9333ea" },
  { label: "Sunset",      css: "linear-gradient(135deg,#f59e0b,#ea580c)", hex: "#f59e0b" },
  { label: "Emerald",     css: "linear-gradient(135deg,#10b981,#0d9488)", hex: "#10b981" },
  { label: "Rose",        css: "linear-gradient(135deg,#f43f5e,#ec4899)", hex: "#f43f5e" },
  { label: "Cyan",        css: "linear-gradient(135deg,#06b6d4,#2563eb)", hex: "#06b6d4" },
];

function SchemePicker({ value, onChange }: { value: string; onChange: (css: string) => void }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Color Theme</label>
      <div className="flex gap-3 flex-wrap">
        {SCHEMES.map((s) => (
          <button
            key={s.label}
            type="button"
            title={s.label}
            onClick={() => onChange(s.css)}
            className={`w-10 h-10 rounded-full border-4 transition-transform hover:scale-110 ${value === s.css ? 'border-gray-900 dark:border-white scale-110' : 'border-transparent'}`}
            style={{ background: s.css }}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Single image uploader ── */
function ImageUploader({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file: File) {
    setError(""); setUploading(true); setProgress(0);
    const formData = new FormData();
    formData.append("files", file);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/upload");
    xhr.upload.onprogress = (e) => { if (e.lengthComputable) setProgress(Math.round((e.loaded / e.total) * 100)); };
    xhr.onload = () => {
      setUploading(false);
      if (xhr.status === 200) { onChange(JSON.parse(xhr.responseText).url); setProgress(100); }
      else setError("Upload failed. Try again.");
    };
    xhr.onerror = () => { setUploading(false); setError("Upload failed. Try again."); };
    xhr.send(formData);
  }

  return (
    <div className="space-y-2">
      <input ref={inputRef} type="file" accept="image/*" className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ""; }} />
      {value ? (
        <div className="relative w-full h-40 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700">
          <img src={value} alt="preview" className="w-full h-full object-cover" />
          <button type="button" onClick={() => onChange("")} className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1"><X className="w-4 h-4" /></button>
          <button type="button" onClick={() => inputRef.current?.click()} className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1"><UploadCloud className="w-3 h-3" /> Change</button>
        </div>
      ) : (
        <button type="button" onClick={() => inputRef.current?.click()} disabled={uploading}
          className="w-full h-36 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center gap-2 text-gray-500 dark:text-gray-400 hover:border-blue-500 hover:text-blue-500 transition disabled:opacity-50">
          {uploading ? <UploadCloud className="w-8 h-8 animate-bounce" /> : <ImageIcon className="w-8 h-8" />}
          <span className="text-sm font-medium">{uploading ? "Uploading..." : "Click to upload image"}</span>
        </button>
      )}
      {uploading && (
        <>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <div className="bg-blue-500 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-xs text-blue-500 text-right">{progress}%</p>
        </>
      )}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

/* ── Multi-image uploader ── */
function MultiImageUploader({ values, onChange }: { values: string[]; onChange: (urls: string[]) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  async function handleFile(file: File) {
    setError(""); setUploading(true); setProgress(0);
    const formData = new FormData();
    formData.append("files", file);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/upload");
    xhr.upload.onprogress = (e) => { if (e.lengthComputable) setProgress(Math.round((e.loaded / e.total) * 100)); };
    xhr.onload = () => {
      setUploading(false);
      if (xhr.status === 200) { onChange([...values, JSON.parse(xhr.responseText).url]); setProgress(0); }
      else setError("Upload failed. Try again.");
    };
    xhr.onerror = () => { setUploading(false); setError("Upload failed."); };
    xhr.send(formData);
  }

  function remove(idx: number) { onChange(values.filter((_, i) => i !== idx)); }

  return (
    <div className="space-y-3">
      <input ref={inputRef} type="file" accept="image/*" className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ""; }} />
      {values.length > 0 && (
        <div className="grid grid-cols-4 gap-2">
          {values.map((url, i) => (
            <div key={i} className="relative h-20 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700">
              <img src={url} alt={`photo-${i}`} className="w-full h-full object-cover" />
              <button type="button" onClick={() => remove(i)} className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-0.5"><X className="w-3 h-3" /></button>
            </div>
          ))}
        </div>
      )}
      <button type="button" onClick={() => inputRef.current?.click()} disabled={uploading}
        className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 hover:border-blue-500 hover:text-blue-500 transition text-sm disabled:opacity-50">
        {uploading ? <UploadCloud className="w-4 h-4 animate-bounce" /> : <Plus className="w-4 h-4" />}
        {uploading ? `Uploading… ${progress}%` : "Add Photo"}
      </button>
      {uploading && (
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
          <div className="bg-blue-500 h-1.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      )}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

/* ── Types ── */
type Achievement = {
  _id: string;
  title: string;
  description: string;
  details: string;
  image: string;
  images: string[];
  icon: string;
  gradient: string;
  color: string;
};

type FormData = Omit<Achievement, "_id">;
const emptyForm: FormData = { title: "", description: "", details: "", image: "", images: [], icon: "", gradient: SCHEMES[0].css, color: SCHEMES[0].hex };

/* ── Page ── */
export default function AchievementsAdminPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Achievement | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetchAchievements(); }, []);

  async function fetchAchievements() {
    try { const res = await fetch("/api/achievements"); setAchievements(await res.json()); }
    catch (e) { console.error(e); }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true);
    try {
      const res = await fetch("/api/achievements", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error("Failed");
      alert("Achievement added!"); setForm(emptyForm); await fetchAchievements();
    } catch (err) { alert("Error: " + err); } finally { setLoading(false); }
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault(); if (!editForm) return; setLoading(true);
    try {
      const res = await fetch(`/api/achievements/${editForm._id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editForm) });
      if (!res.ok) throw new Error("Failed");
      alert("Updated!"); setEditingId(null); setEditForm(null); await fetchAchievements();
    } catch (err) { alert("Error: " + err); } finally { setLoading(false); }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this achievement?")) return; setLoading(true);
    try {
      const res = await fetch(`/api/achievements/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed");
      alert("Deleted!"); await fetchAchievements();
    } catch (err) { alert("Error: " + err); } finally { setLoading(false); }
  }

  const inputCls = "border border-gray-300 dark:border-gray-600 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white";
  const labelCls = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">🏆 Achievements Management</h1>

        {/* ── Add Form ── */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Add New Achievement</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Title <span className="text-red-500">*</span></label>
                <input type="text" placeholder="e.g. Best Teacher's Award 2024" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputCls} required />
              </div>
              <div>
                <label className={labelCls}>Icon</label>
                <select value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className={inputCls}>
                  <option value="">Select icon…</option>
                  <option value="Trophy">🏆 Trophy</option>
                  <option value="Award">🥇 Award</option>
                  <option value="Star">⭐ Star</option>
                  <option value="Sparkles">✨ Sparkles</option>
                  <option value="Medal">🏅 Medal</option>
                </select>
              </div>
            </div>

            <div>
              <label className={labelCls}>Short Description <span className="text-red-500">*</span></label>
              <textarea placeholder="One-line summary shown on the card" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={inputCls} rows={2} required />
            </div>

            <div>
              <label className={labelCls}>Full Details <span className="text-red-500">*</span></label>
              <textarea placeholder="Detailed description shown in the popup" value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} className={inputCls} rows={4} required />
            </div>

            <div>
              <label className={labelCls}>Cover Image <span className="text-red-500">*</span></label>
              <ImageUploader value={form.image} onChange={(url) => setForm({ ...form, image: url })} />
            </div>

            <div>
              <label className={labelCls}>Additional Photos</label>
              <MultiImageUploader values={form.images} onChange={(urls) => setForm({ ...form, images: urls })} />
            </div>

            <SchemePicker
              value={form.gradient}
              onChange={(css) => { const s = SCHEMES.find(s => s.css === css)!; setForm({ ...form, gradient: css, color: s.hex }); }}
            />

            <button type="submit" disabled={loading || !form.image}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-bold px-6 py-3 rounded transition">
              {loading ? "Adding..." : "✚ Add Achievement"}
            </button>
          </form>
        </div>

        {/* ── List ── */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">All Achievements ({achievements.length})</h2>
          {achievements.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">No achievements yet. Add one above!</p>
          ) : (
            <div className="space-y-4">
              {achievements.map((ach) => {
                const allPhotos = [ach.image, ...(ach.images || [])].filter(Boolean);
                return (
                  <div key={ach._id} className="border border-gray-300 dark:border-gray-600 p-4 rounded-lg hover:shadow-md transition dark:bg-gray-700">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {ach.gradient && <span className="inline-block w-4 h-4 rounded-full flex-shrink-0" style={{ background: ach.gradient }} />}
                          <h3 className="font-bold text-lg text-gray-900 dark:text-white truncate">{ach.title}</h3>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{ach.description}</p>
                        {allPhotos.length > 0 && (
                          <div className="flex gap-2 mt-2 flex-wrap">
                            {allPhotos.map((url, i) => (
                              <img key={i} src={url} alt="" className="w-14 h-10 rounded object-cover border border-gray-200 dark:border-gray-600" />
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <button onClick={() => { setEditingId(ach._id); setEditForm({ ...ach, images: ach.images || [] }); }} className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition" title="Edit"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(ach._id)} disabled={loading} className="bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white p-2 rounded transition" title="Delete"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Edit Modal ── */}
        {editingId && editForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white dark:bg-gray-800 p-6 border-b border-gray-300 dark:border-gray-600 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Achievement</h2>
                <button onClick={() => { setEditingId(null); setEditForm(null); }} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition">
                  <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
              <form onSubmit={handleUpdate} className="p-6 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><label className={labelCls}>Title</label><input type="text" value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} className={inputCls} required /></div>
                  <div>
                    <label className={labelCls}>Icon</label>
                    <select value={editForm.icon} onChange={(e) => setEditForm({ ...editForm, icon: e.target.value })} className={inputCls}>
                      <option value="">Select icon…</option>
                      <option value="Trophy">🏆 Trophy</option>
                      <option value="Award">🥇 Award</option>
                      <option value="Star">⭐ Star</option>
                      <option value="Sparkles">✨ Sparkles</option>
                      <option value="Medal">🏅 Medal</option>
                    </select>
                  </div>
                </div>
                <div><label className={labelCls}>Short Description</label><textarea value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} className={inputCls} rows={2} required /></div>
                <div><label className={labelCls}>Full Details</label><textarea value={editForm.details} onChange={(e) => setEditForm({ ...editForm, details: e.target.value })} className={inputCls} rows={4} required /></div>
                <div><label className={labelCls}>Cover Image</label><ImageUploader value={editForm.image} onChange={(url) => setEditForm({ ...editForm, image: url })} /></div>
                <div><label className={labelCls}>Additional Photos</label><MultiImageUploader values={editForm.images || []} onChange={(urls) => setEditForm({ ...editForm, images: urls })} /></div>
                <SchemePicker
                  value={editForm.gradient}
                  onChange={(css) => { const s = SCHEMES.find(s => s.css === css)!; setEditForm({ ...editForm, gradient: css, color: s.hex }); }}
                />
                <div className="flex gap-4 pt-2">
                  <button type="submit" disabled={loading} className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold px-6 py-3 rounded transition flex items-center justify-center gap-2">
                    <Check className="w-4 h-4" />{loading ? "Saving..." : "Save Changes"}
                  </button>
                  <button type="button" onClick={() => { setEditingId(null); setEditForm(null); }} className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-bold px-6 py-3 rounded transition">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
