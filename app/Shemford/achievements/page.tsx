"use client";
import { useState, useEffect } from "react";
import { Edit2, Trash2, X, Check } from "lucide-react";

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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Achievement | null>(null);
  const [loading, setLoading] = useState(false);

  // load data
  useEffect(() => {
    fetchAchievements();
  }, []);

  async function fetchAchievements() {
    try {
      const res = await fetch("/api/achievements");
      const data = await res.json();
      setAchievements(data);
    } catch (error) {
      console.error("Error fetching achievements:", error);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/achievements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to add achievement");
      
      alert("Achievement added successfully!");
      setForm({ title: "", description: "", details: "", image: "", icon: "", gradient: "", color: "" });
      await fetchAchievements();
    } catch (error) {
      alert("Error adding achievement: " + error);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!editForm) return;
    
    setLoading(true);
    try {
      const res = await fetch(`/api/achievements/${editForm._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      if (!res.ok) throw new Error("Failed to update achievement");
      
      alert("Achievement updated successfully!");
      setEditingId(null);
      setEditForm(null);
      await fetchAchievements();
    } catch (error) {
      alert("Error updating achievement: " + error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this achievement?")) return;
    
    setLoading(true);
    try {
      const res = await fetch(`/api/achievements/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete achievement");
      
      alert("Achievement deleted successfully!");
      await fetchAchievements();
    } catch (error) {
      alert("Error deleting achievement: " + error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
          🏆 Achievements Management
        </h1>

        {/* Add New Achievement Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Add New Achievement</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                type="text" 
                placeholder="Title" 
                value={form.title} 
                onChange={(e) => setForm({ ...form, title: e.target.value })} 
                className="border border-gray-300 dark:border-gray-600 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" 
                required
              />
              <input 
                type="text" 
                placeholder="Icon Name (Trophy/Award/Star/Sparkles)" 
                value={form.icon} 
                onChange={(e) => setForm({ ...form, icon: e.target.value })} 
                className="border border-gray-300 dark:border-gray-600 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" 
              />
            </div>
            
            <textarea 
              placeholder="Description" 
              value={form.description} 
              onChange={(e) => setForm({ ...form, description: e.target.value })} 
              className="border border-gray-300 dark:border-gray-600 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" 
              rows={2}
              required
            />
            
            <textarea 
              placeholder="Details" 
              value={form.details} 
              onChange={(e) => setForm({ ...form, details: e.target.value })} 
              className="border border-gray-300 dark:border-gray-600 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" 
              rows={3}
              required
            />

            <input 
              type="text" 
              placeholder="Image URL (Cloudinary or HTTPS)" 
              value={form.image} 
              onChange={(e) => setForm({ ...form, image: e.target.value })} 
              className="border border-gray-300 dark:border-gray-600 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" 
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                type="text" 
                placeholder="Gradient (e.g., from-purple-500 to-pink-500)" 
                value={form.gradient} 
                onChange={(e) => setForm({ ...form, gradient: e.target.value })} 
                className="border border-gray-300 dark:border-gray-600 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" 
                required
              />
              <input 
                type="text" 
                placeholder="Color" 
                value={form.color} 
                onChange={(e) => setForm({ ...form, color: e.target.value })} 
                className="border border-gray-300 dark:border-gray-600 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" 
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-bold px-6 py-3 rounded transition"
            >
              {loading ? "Adding..." : "✚ Add Achievement"}
            </button>
          </form>
        </div>

        {/* List of Achievements */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            All Achievements ({achievements.length})
          </h2>
          
          {achievements.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">No achievements yet. Add one above!</p>
          ) : (
            <div className="space-y-4">
              {achievements.map((ach) => (
                <div key={ach._id} className="border border-gray-300 dark:border-gray-600 p-4 rounded-lg hover:shadow-md transition dark:bg-gray-700">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white">{ach.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{ach.description}</p>
                      {ach.image && (
                        <img src={ach.image} alt={ach.title} className="mt-2 w-12 h-12 rounded object-cover" />
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingId(ach._id);
                          setEditForm(ach);
                        }}
                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition flex items-center gap-2"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(ach._id)}
                        disabled={loading}
                        className="bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white p-2 rounded transition flex items-center gap-2"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Edit Modal */}
        {editingId && editForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white dark:bg-gray-800 p-6 border-b border-gray-300 dark:border-gray-600 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Achievement</h2>
                <button
                  onClick={() => {
                    setEditingId(null);
                    setEditForm(null);
                  }}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition"
                >
                  <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              <form onSubmit={handleUpdate} className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                    <input 
                      type="text" 
                      value={editForm.title} 
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} 
                      className="border border-gray-300 dark:border-gray-600 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Icon</label>
                    <input 
                      type="text" 
                      value={editForm.icon} 
                      onChange={(e) => setEditForm({ ...editForm, icon: e.target.value })} 
                      className="border border-gray-300 dark:border-gray-600 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                  <textarea 
                    value={editForm.description} 
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} 
                    className="border border-gray-300 dark:border-gray-600 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    rows={2}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Details</label>
                  <textarea 
                    value={editForm.details} 
                    onChange={(e) => setEditForm({ ...editForm, details: e.target.value })} 
                    className="border border-gray-300 dark:border-gray-600 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
                  <input 
                    type="text" 
                    value={editForm.image} 
                    onChange={(e) => setEditForm({ ...editForm, image: e.target.value })} 
                    className="border border-gray-300 dark:border-gray-600 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                  {editForm.image && (
                    <img src={editForm.image} alt="preview" className="mt-2 w-20 h-20 rounded object-cover" />
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gradient</label>
                    <input 
                      type="text" 
                      value={editForm.gradient} 
                      onChange={(e) => setEditForm({ ...editForm, gradient: e.target.value })} 
                      className="border border-gray-300 dark:border-gray-600 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Color</label>
                    <input 
                      type="text" 
                      value={editForm.color} 
                      onChange={(e) => setEditForm({ ...editForm, color: e.target.value })} 
                      className="border border-gray-300 dark:border-gray-600 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold px-6 py-3 rounded transition flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setEditForm(null);
                    }}
                    className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-bold px-6 py-3 rounded transition"
                  >
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
