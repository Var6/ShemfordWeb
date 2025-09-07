"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Facility {
  _id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  icon: string;
  features: string[];
  createdAt: string;
}

export default function FacilitiesAdminPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("academic");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [icon, setIcon] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState("");
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchFacilities();
  }, []);

  async function fetchFacilities() {
    try {
      const res = await fetch("/api/facilities");
      const data = await res.json();
      setFacilities(data);
    } catch (error) {
      console.error("Error fetching facilities:", error);
    }
  }

  async function uploadImage(file: File) {
    const formData = new FormData();
    formData.append('files', file);
    
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    
    const data = await res.json();
    return data.url;
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  function addFeature() {
    if (featureInput.trim()) {
      setFeatures([...features, featureInput.trim()]);
      setFeatureInput("");
    }
  }

  function removeFeature(index: number) {
    setFeatures(features.filter((_, i) => i !== index));
  }

  async function handleSubmit() {
    setLoading(true);
    let imageUrl = image;

    try {
      if (imageFile) {
        setUploadingImage(true);
        imageUrl = await uploadImage(imageFile);
        setUploadingImage(false);
      }

      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `/api/facilities/${editingId}` : "/api/facilities";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, category, image: imageUrl, icon, features }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        resetForm();
        fetchFacilities();
        setShowForm(false);
      } else {
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("Error submitting facility:", error);
    }
    setLoading(false);
    setUploadingImage(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this facility?")) return;
    
    try {
      const res = await fetch(`/api/facilities/${id}`, {
        method: "DELETE",
      });
      
      if (res.ok) {
        fetchFacilities();
      }
    } catch (error) {
      console.error("Error deleting facility:", error);
    }
  }

  function handleEdit(facility: Facility) {
    setTitle(facility.title);
    setDescription(facility.description);
    setCategory(facility.category);
    setImage(facility.image);
    setImagePreview(facility.image);
    setIcon(facility.icon);
    setFeatures(facility.features);
    setEditingId(facility._id);
    setShowForm(true);
  }

  function resetForm() {
    setTitle("");
    setDescription("");
    setCategory("academic");
    setImage("");
    setImageFile(null);
    setImagePreview("");
    setIcon("");
    setFeatures([]);
    setFeatureInput("");
    setEditingId(null);
  }

  function cancelEdit() {
    resetForm();
    setShowForm(false);
  }

  const categories = [
    { value: "academic", label: "Academic", icon: "📚", color: "bg-blue-100 text-blue-800" },
    { value: "arts", label: "Arts", icon: "🎨", color: "bg-purple-100 text-purple-800" },
    { value: "sports", label: "Sports", icon: "⚽", color: "bg-green-100 text-green-800" },
    { value: "wellness", label: "Wellness", icon: "🏥", color: "bg-red-100 text-red-800" },
    { value: "technology", label: "Technology", icon: "💻", color: "bg-gray-100 text-gray-800" },
    { value: "library", label: "Library", icon: "📖", color: "bg-yellow-100 text-yellow-800" },
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
              <h1 className="text-2xl font-bold text-gray-800">Facilities Management</h1>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              {showForm ? "Cancel" : "Add Facility"}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showForm && (
          <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              {editingId ? "Edit Facility" : "Add New Facility"}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Facility Title</label>
                <input
                  type="text"
                  placeholder="Science Laboratory"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.icon} {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  placeholder="Detailed description of the facility"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Icon (Emoji)</label>
                <input
                  type="text"
                  placeholder="🏫"
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Add Feature</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Enter a feature"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={addFeature}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg transition-colors duration-200"
                  >
                    Add
                  </button>
                </div>
              </div>

              {features.length > 0 && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                  <div className="space-y-2 max-h-32 overflow-y-auto bg-gray-50 p-3 rounded-lg">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center justify-between bg-white p-2 rounded border">
                        <span className="text-sm text-gray-700">{feature}</span>
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Facility Image</label>
                <div className="space-y-4">
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> facility image
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG or JPEG</p>
                      </div>
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                    </label>
                  </div>
                  
                  {imagePreview && (
                    <div className="relative">
                      <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
                      <button
                        onClick={() => {
                          setImagePreview("");
                          setImageFile(null);
                          setImage("");
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
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
                    placeholder="https://example.com/facility.jpg or gradient class"
                    value={image}
                    onChange={(e) => {
                      setImage(e.target.value);
                      if (e.target.value.startsWith('http')) {
                        setImagePreview(e.target.value);
                      }
                      setImageFile(null);
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
                  uploadingImage ? "Uploading Image..." : "Saving..."
                ) : editingId ? "Update Facility" : "Add Facility"}
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
            <h3 className="text-lg font-semibold text-gray-800">All Facilities ({facilities.length})</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {facilities.map((facility) => (
              <div key={facility._id} className="bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="text-2xl mr-3">{facility.icon}</div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">{facility.title}</h4>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          categories.find(cat => cat.value === facility.category)?.color || 'bg-gray-100 text-gray-800'
                        }`}>
                          {categories.find(cat => cat.value === facility.category)?.label || facility.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  {facility.image && facility.image.startsWith('http') && (
                    <img src={facility.image} alt={facility.title} className="w-full h-32 object-cover rounded-lg mb-4" />
                  )}

                  <p className="text-gray-600 text-sm mb-4">{facility.description.substring(0, 100)}...</p>

                  {facility.features.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Features:</p>
                      <div className="space-y-1 max-h-20 overflow-y-auto">
                        {facility.features.slice(0, 3).map((feature, index) => (
                          <div key={index} className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                            • {feature}
                          </div>
                        ))}
                        {facility.features.length > 3 && (
                          <div className="text-xs text-gray-500">+{facility.features.length - 3} more</div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-4 border-t">
                    <span className="text-xs text-gray-500">
                      Created: {new Date(facility.createdAt).toLocaleDateString()}
                    </span>
                    <div className="space-x-2">
                      <button
                        onClick={() => handleEdit(facility)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(facility._id)}
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

          {facilities.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">No facilities found</div>
              <button
                onClick={() => setShowForm(true)}
                className="mt-4 text-blue-600 hover:text-blue-800"
              >
                Add your first facility
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}