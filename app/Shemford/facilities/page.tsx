"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Plus, X, Edit, Trash2, Upload, Image, Tag, Users, Calendar,
  Search, Filter, Grid, List, Eye, ArrowLeft, Save, Camera,
  GraduationCap, Monitor, Microscope, Music, Palette, 
  Heart, Book, Coffee, Zap, MapPin, Shield
} from "lucide-react";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [dragActive, setDragActive] = useState(false);

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

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

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
    { value: "academic", label: "Academic", icon: GraduationCap, emoji: "📚", color: "from-blue-500 to-blue-600", bgColor: "bg-blue-100 text-blue-800" },
    { value: "arts", label: "Arts", icon: Palette, emoji: "🎨", color: "from-purple-500 to-purple-600", bgColor: "bg-purple-100 text-purple-800" },
    { value: "sports", label: "Sports", icon: Users, emoji: "⚽", color: "from-green-500 to-green-600", bgColor: "bg-green-100 text-green-800" },
    { value: "wellness", label: "Wellness", icon: Heart, emoji: "🏥", color: "from-red-500 to-red-600", bgColor: "bg-red-100 text-red-800" },
    { value: "technology", label: "Technology", icon: Monitor, emoji: "💻", color: "from-gray-500 to-gray-600", bgColor: "bg-gray-100 text-gray-800" },
    { value: "library", label: "Library", icon: Book, emoji: "📖", color: "from-yellow-500 to-yellow-600", bgColor: "bg-yellow-100 text-yellow-800" },
    { value: "dining", label: "Dining", icon: Coffee, emoji: "🍽️", color: "from-orange-500 to-orange-600", bgColor: "bg-orange-100 text-orange-800" },
    { value: "safety", label: "Safety", icon: Shield, emoji: "🛡️", color: "from-indigo-500 to-indigo-600", bgColor: "bg-indigo-100 text-indigo-800" },
  ];

  const getCategoryInfo = (categoryValue: string) => {
    return categories.find(cat => cat.value === categoryValue) || categories[0];
  };

  const filteredFacilities = facilities.filter(facility => {
    const matchesSearch = facility.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         facility.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || facility.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/Shemford" className="text-blue-600 hover:text-blue-800 transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Facilities Management
                  </h1>
                  <p className="text-sm text-gray-500">Manage your school's facilities</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="hidden sm:flex items-center space-x-2 bg-white/50 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-all ${viewMode === "grid" ? "bg-blue-600 text-white shadow-md" : "text-gray-600 hover:bg-gray-100"}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-all ${viewMode === "list" ? "bg-blue-600 text-white shadow-md" : "text-gray-600 hover:bg-gray-100"}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => setShowForm(!showForm)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">Add Facility</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Create/Edit Form */}
        <div className={`transition-all duration-500 ease-in-out transform origin-top ${showForm ? 'opacity-100 scale-y-100 mb-8' : 'opacity-0 scale-y-0 h-0 overflow-hidden'}`}>
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white flex items-center space-x-2">
                <Plus className="w-5 h-5" />
                <span>{editingId ? "Edit Facility" : "Create New Facility"}</span>
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Facility Title</label>
                  <input
                    type="text"
                    placeholder="Science Laboratory"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.emoji} {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Description</label>
                <textarea
                  placeholder="Detailed description of the facility..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Icon (Emoji)</label>
                  <input
                    type="text"
                    placeholder="🏫"
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                    className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Add Feature</label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Enter a feature"
                      value={featureInput}
                      onChange={(e) => setFeatureInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                      className="flex-1 px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={addFeature}
                      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-3 rounded-xl transition-all duration-200"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {features.length > 0 && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Features ({features.length})</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-32 overflow-y-auto bg-gray-50/50 p-4 rounded-xl">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm border">
                        <span className="text-sm text-gray-700 flex-1">{feature}</span>
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="text-red-500 hover:text-red-700 ml-2 p-1 hover:bg-red-50 rounded transition-all"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Image Upload Section */}
              <div className="space-y-4">
                <label className="text-sm font-medium text-gray-700">Facility Banner Image</label>
                
                <div
                  className={`border-2 border-dashed rounded-xl p-8 transition-all duration-200 ${
                    dragActive
                      ? 'border-blue-400 bg-blue-50'
                      : imagePreview
                      ? 'border-green-400 bg-green-50'
                      : 'border-gray-300 bg-white/50 hover:border-gray-400'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {imagePreview ? (
                    <div className="relative">
                      <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
                      <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <div className="flex space-x-2">
                          <button
                            type="button"
                            onClick={() => document.getElementById('file-upload')?.click()}
                            className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-white/30 transition-all"
                          >
                            <Camera className="w-5 h-5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setImagePreview("");
                              setImageFile(null);
                              setImage("");
                            }}
                            className="bg-red-500/20 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-red-500/30 transition-all"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <div className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">Click to upload</span> or drag and drop
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG or JPEG (recommended: 1200x400px)</p>
                    </div>
                  )}
                  
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>

                <div className="text-center text-sm text-gray-500 font-medium">OR</div>
                
                <input
                  type="text"
                  placeholder="https://example.com/image.jpg or CSS gradient class"
                  value={image}
                  onChange={(e) => {
                    setImage(e.target.value);
                    if (e.target.value.startsWith('http')) {
                      setImagePreview(e.target.value);
                    }
                    setImageFile(null);
                  }}
                  className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-6">
                <button
                  onClick={handleSubmit}
                  disabled={loading || uploadingImage}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 disabled:scale-100 shadow-lg hover:shadow-xl disabled:shadow-none flex items-center justify-center space-x-2"
                >
                  {loading || uploadingImage ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>{uploadingImage ? "Uploading..." : "Saving..."}</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      <span>{editingId ? "Update Facility" : "Create Facility"}</span>
                    </>
                  )}
                </button>
                <button
                  onClick={cancelEdit}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search facilities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 w-full sm:w-64"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3 py-2 bg-white/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="all">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.emoji} {cat.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="text-sm text-gray-600">
              Showing {filteredFacilities.length} of {facilities.length} facilities
            </div>
          </div>
        </div>

        {/* Facilities Display */}
        {filteredFacilities.length === 0 ? (
          <div className="text-center py-20 bg-white/50 backdrop-blur-xl rounded-2xl border border-white/20">
            <GraduationCap className="mx-auto h-16 w-16 text-gray-400 mb-6" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No facilities found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterCategory !== "all"
                ? "Try adjusting your search or filters"
                : "Create your first facility to get started"
              }
            </p>
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105"
              >
                Add Your First Facility
              </button>
            )}
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === "grid" 
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
              : "grid-cols-1"
          }`}>
            {filteredFacilities.map((facility, index) => {
              const categoryInfo = getCategoryInfo(facility.category);
              const IconComponent = categoryInfo.icon;
              
              return (
                <div
                  key={facility._id}
                  className="group bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Banner Image */}
                  <div className="relative h-48 overflow-hidden">
                    {facility.image ? (
                      facility.image.startsWith('http') ? (
                        <img 
                          src={facility.image} 
                          alt={facility.title} 
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                        />
                      ) : facility.image.startsWith('bg-') ? (
                        <div className={`w-full h-full ${facility.image} transition-transform duration-300 group-hover:scale-110`} />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${categoryInfo.color} transition-transform duration-300 group-hover:scale-110`} />
                      )
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${categoryInfo.color} transition-transform duration-300 group-hover:scale-110`} />
                    )}
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 border border-white/30">
                        <IconComponent className="w-4 h-4 text-white" />
                        <span className="text-white text-sm font-medium">{categoryInfo.label}</span>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                      <button
                        onClick={() => handleEdit(facility)}
                        className="bg-blue-500/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-blue-500/30 transition-all"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(facility._id)}
                        className="bg-red-500/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-red-500/30 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Icon */}
                    <div className="absolute bottom-4 left-4">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl border border-white/30">
                        {facility.icon}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {facility.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {facility.description.length > 120 
                        ? `${facility.description.substring(0, 120)}...` 
                        : facility.description
                      }
                    </p>

                    {facility.features.length > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center mb-2">
                          <Tag className="w-4 h-4 text-gray-500 mr-2" />
                          <span className="text-sm font-medium text-gray-700">Key Features</span>
                        </div>
                        <div className="grid grid-cols-1 gap-2 max-h-20 overflow-y-auto">
                          {facility.features.slice(0, 3).map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded-md">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 flex-shrink-0" />
                              <span className="truncate">{feature}</span>
                            </div>
                          ))}
                          {facility.features.length > 3 && (
                            <div className="text-xs text-gray-500 px-2 py-1 bg-blue-50 rounded-md text-center">
                              +{facility.features.length - 3} more features
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(facility.createdAt).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEdit(facility)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:bg-blue-50 px-3 py-1 rounded-md transition-all"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(facility._id)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium hover:bg-red-50 px-3 py-1 rounded-md transition-all"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Stats Cards */}
        {facilities.length > 0 && (
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/60 backdrop-blur-xl rounded-xl p-4 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{facilities.length}</p>
                  <p className="text-sm text-gray-600">Total Facilities</p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-xl rounded-xl p-4 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{new Set(facilities.map(f => f.category)).size}</p>
                  <p className="text-sm text-gray-600">Categories</p>
                </div>
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Tag className="w-5 h-5 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-xl rounded-xl p-4 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {facilities.reduce((acc, f) => acc + f.features.length, 0)}
                  </p>
                  <p className="text-sm text-gray-600">Total Features</p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-xl rounded-xl p-4 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {facilities.filter(f => f.image && f.image.startsWith('http')).length}
                  </p>
                  <p className="text-sm text-gray-600">With Images</p>
                </div>
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Image className="w-5 h-5 text-orange-600" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}