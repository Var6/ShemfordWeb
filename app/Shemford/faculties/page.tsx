"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Faculty {
  _id: string;
  name: string;
  subject: string;
  achievements: string;
  experience: string;
  joinedDate: string;
  bio: string;
  message: string;
  profileUrl: string;
  createdAt: string;
}

export default function FacultiesAdmin() {
  const [faculties, setFaculties] = useState<Faculty[]>([]);
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
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  async function fetchFaculties() {
    try {
      const res = await fetch("/api/faculties");
      const data = await res.json();
      setFaculties(data);
    } catch (error) {
      console.error("Error fetching faculties:", error);
    }
  }

  useEffect(() => {
    fetchFaculties();
  }, []);

  async function handleUpload() {
    if (!file) return null;
    
    const formData = new FormData();
    formData.append("files", file);
    
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    
    const data = await res.json();
    return data.url;
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setImagePreview(URL.createObjectURL(selectedFile));
  }

  async function handleSubmit() {
    setLoading(true);
    let profileUrl = form.profileUrl;

    try {
      if (file) {
        setUploadingImage(true);
        profileUrl = await handleUpload();
        setUploadingImage(false);
      }

      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `/api/faculties/${editingId}` : "/api/faculties";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, profileUrl }),
      });

      if (res.ok) {
        resetForm();
        fetchFaculties();
        setShowForm(false);
      }
    } catch (error) {
      console.error("Error submitting faculty:", error);
    }
    setLoading(false);
    setUploadingImage(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this faculty member?")) return;
    
    try {
      await fetch(`/api/faculties/${id}`, { method: "DELETE" });
      fetchFaculties();
    } catch (error) {
      console.error("Error deleting faculty:", error);
    }
  }

  function handleEdit(faculty: Faculty) {
    setForm({
      name: faculty.name,
      subject: faculty.subject,
      achievements: faculty.achievements,
      experience: faculty.experience,
      joinedDate: faculty.joinedDate,
      bio: faculty.bio,
      message: faculty.message,
      profileUrl: faculty.profileUrl,
    });
    setImagePreview(faculty.profileUrl);
    setEditingId(faculty._id);
    setShowForm(true);
  }

  function resetForm() {
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
    setImagePreview("");
    setEditingId(null);
  }

  function cancelEdit() {
    resetForm();
    setShowForm(false);
  }

  const subjects = [
    "Mathematics", "Science", "English", "Hindi", "Social Studies", 
    "Physics", "Chemistry", "Biology", "Computer Science", "Physical Education",
    "Art", "Music", "Sanskrit", "French", "German"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/Shemford" className="text-blue-600 hover:text-blue-800">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <h1 className="text-2xl font-bold text-gray-800">Faculty Management</h1>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              {showForm ? "Cancel" : "Add Faculty"}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showForm && (
          <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              {editingId ? "Edit Faculty Member" : "Add New Faculty Member"}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="Dr. John Smith"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <select
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="">Select Subject</option>
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                <input
                  type="text"
                  placeholder="10+ years"
                  value={form.experience}
                  onChange={(e) => setForm({ ...form, experience: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Joined Date</label>
                <input
                  type="date"
                  value={form.joinedDate}
                  onChange={(e) => setForm({ ...form, joinedDate: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Achievements</label>
                <input
                  type="text"
                  placeholder="Awards, certifications, notable accomplishments"
                  value={form.achievements}
                  onChange={(e) => setForm({ ...form, achievements: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <textarea
                  placeholder="Professional background and education"
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Message to Students</label>
                <textarea
                  placeholder="Inspirational message or teaching philosophy"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Profile Photo</label>
                <div className="space-y-4">
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> profile photo
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG or JPEG</p>
                      </div>
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                    </label>
                  </div>
                  
                  {imagePreview && (
                    <div className="relative w-32 h-32 mx-auto">
                      <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-lg" />
                      <button
                        onClick={() => {
                          setImagePreview("");
                          setFile(null);
                          setForm({ ...form, profileUrl: "" });
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}

                  <div className="text-center text-sm text-gray-500">OR</div>
                  
                  <input
                    type="text"
                    placeholder="https://example.com/profile.jpg"
                    value={form.profileUrl}
                    onChange={(e) => {
                      setForm({ ...form, profileUrl: e.target.value });
                      setImagePreview(e.target.value);
                      setFile(null);
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <button
                onClick={handleSubmit}
                disabled={loading || uploadingImage}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 disabled:opacity-50"
              >
                {loading || uploadingImage ? (
                  uploadingImage ? "Uploading Photo..." : "Saving..."
                ) : editingId ? "Update Faculty" : "Add Faculty"}
              </button>
              <button
                onClick={cancelEdit}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-800">Faculty Members ({faculties.length})</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {faculties.map((faculty) => (
              <div key={faculty._id} className="bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={faculty.profileUrl || "/default-avatar.png"}
                      alt={faculty.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">{faculty.name}</h4>
                      <p className="text-blue-600 font-medium">{faculty.subject}</p>
                      <p className="text-gray-500 text-sm">{faculty.experience}</p>
                    </div>
                  </div>

                  {faculty.achievements && (
                    <div className="mb-3">
                      <p className="text-sm text-gray-600"><strong>Achievements:</strong> {faculty.achievements}</p>
                    </div>
                  )}

                  {faculty.bio && (
                    <div className="mb-3">
                      <p className="text-sm text-gray-600">{faculty.bio.substring(0, 100)}...</p>
                    </div>
                  )}

                  <div className="flex justify-between items-center mt-4 pt-4 border-t">
                    <span className="text-xs text-gray-500">
                      Joined: {faculty.joinedDate || "N/A"}
                    </span>
                    <div className="space-x-2">
                      <button
                        onClick={() => handleEdit(faculty)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(faculty._id)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {faculties.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">No faculty members found</div>
              <button
                onClick={() => setShowForm(true)}
                className="mt-4 text-blue-600 hover:text-blue-800"
              >
                Add your first faculty member
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}