'use client';
import { useState } from "react";
import { Calendar, Clock, MapPin, Users, Tag, User, Link, Image, Star, Save, Upload } from "lucide-react";

type FormData = {
  title: string;
  date: string;
  time: string;
  description: string;
  category: string;
  venue: string;
  capacity: string;
  featured: boolean;
  image: string;
  registerLink: string;
  organizer: string;
};

type Errors = {
  [K in keyof FormData]?: string;
};

export default function EventsAdminPage() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    date: "",
    time: "",
    description: "",
    category: "",
    venue: "",
    capacity: "",
    featured: false,
    image: "",
    registerLink: "",
    organizer: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const categories = [
    "Conference", "Workshop", "Seminar", "Networking", "Entertainment", 
    "Sports", "Education", "Technology", "Business", "Health & Wellness"
  ];

  const validateForm = () => {
    const newErrors: Errors = {};
    
    if (!formData.title.trim()) newErrors.title = "Event title is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.time) newErrors.time = "Time is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.venue.trim()) newErrors.venue = "Venue is required";
    if (!formData.capacity || parseInt(formData.capacity) <= 0) newErrors.capacity = "Valid capacity is required";
    if (!formData.organizer.trim()) newErrors.organizer = "Organizer name is required";
    if (!formData.registerLink.trim()) newErrors.registerLink = "Registration link is required";
    if (!formData.image.trim()) newErrors.image = "Event image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    handleInputChange("image", value);
    setImagePreview(value);
  };

  async function handleSubmit(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          capacity: parseInt(formData.capacity),
        }),
      });

      const data = await res.json();
      
      if (res.ok) {
        // Reset form on success
        setFormData({
          title: "",
          date: "",
          time: "",
          description: "",
          category: "",
          venue: "",
          capacity: "",
          featured: false,
          image: "",
          registerLink: "",
          organizer: "",
        });
        setImagePreview("");
        alert("Event created successfully!");
      } else {
        alert("Error creating event: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      alert("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  type InputFieldProps = {
    icon: React.ElementType;
    label: string;
    error?: string;
    children: React.ReactNode;
  };

  const InputField = ({ icon: Icon, label, error, children }: InputFieldProps) => (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <Icon className="w-4 h-4 text-blue-600" />
        {label}
      </label>
      {children}
      {error && <p className="text-sm text-red-600 flex items-center gap-1">⚠️ {error}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Create New Event</h1>
          <p className="text-gray-600">Fill in the details below to create an amazing event</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Left Column */}
            <div className="space-y-6">
              <InputField icon={Tag} label="Event Title" error={errors.title}>
                <input
                  type="text"
                  placeholder="Enter a compelling event title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </InputField>

              <div className="grid grid-cols-2 gap-4">
                <InputField icon={Calendar} label="Date" error={errors.date}>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </InputField>

                <InputField icon={Clock} label="Time" error={errors.time}>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleInputChange("time", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </InputField>
              </div>

              <InputField icon={Tag} label="Category" error={errors.category}>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </InputField>

              <InputField icon={MapPin} label="Venue" error={errors.venue}>
                <input
                  type="text"
                  placeholder="Event location or venue"
                  value={formData.venue}
                  onChange={(e) => handleInputChange("venue", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </InputField>

              <InputField icon={Users} label="Capacity" error={errors.capacity}>
                <input
                  type="number"
                  placeholder="Maximum number of attendees"
                  value={formData.capacity}
                  onChange={(e) => handleInputChange("capacity", e.target.value)}
                  min="1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </InputField>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <InputField icon={User} label="Organizer" error={errors.organizer}>
                <input
                  type="text"
                  placeholder="Event organizer name"
                  value={formData.organizer}
                  onChange={(e) => handleInputChange("organizer", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </InputField>

              <InputField icon={Link} label="Registration Link" error={errors.registerLink}>
                <input
                  type="url"
                  placeholder="https://example.com/register"
                  value={formData.registerLink}
                  onChange={(e) => handleInputChange("registerLink", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </InputField>

              <InputField icon={Image} label="Event Image" error={errors.image}>
                <input
                  type="url"
                  placeholder="Image URL (Cloudinary or other)"
                  value={formData.image}
                  onChange={handleImageChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                {imagePreview && (
                  <div className="mt-3">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-lg border"
                      onError={() => setImagePreview("")}
                    />
                  </div>
                )}
              </InputField>

              <div className="bg-blue-50 p-4 rounded-lg">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => handleInputChange("featured", e.target.checked)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Mark as Featured Event
                  </span>
                </label>
                <p className="text-xs text-gray-500 mt-1 ml-8">
                  Featured events get priority placement and special highlighting
                </p>
              </div>
            </div>
          </div>

          {/* Description - Full Width */}
          <div className="mt-8">
            <InputField icon={Tag} label="Event Description" error={errors.description}>
              <textarea
                placeholder="Provide a detailed description of your event, including what attendees can expect, agenda, speakers, etc."
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
              />
            </InputField>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-3"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  Creating Event...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Create Event
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Need help? Check our event creation guidelines or contact support.</p>
        </div>
      </div>
    </div>
  );
}