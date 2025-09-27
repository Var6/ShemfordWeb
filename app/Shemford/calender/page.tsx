"use client";

import { useState, useEffect } from "react";
import React from "react";

import { Calendar, Plus, Trash2, Edit, Bell, Plane, Star } from "lucide-react";

interface CalendarItem {
  _id: string;
  title: string;
  type: 'holiday' | 'vacation' | 'notice';
  description?: string;
  date?: string;
  category?: string;
  start?: string;
  end?: string;
  reopen?: string;
  priority?: 'high' | 'medium' | 'low';
}

interface FormData {
  title: string;
  description: string;
  date: string;
  category: string;
  start: string;
  end: string;
  reopen: string;
  priority: 'high' | 'medium' | 'low';
  file: File | null;
}

export default function CalendarAdmin() {
  const [activeTab, setActiveTab] = useState<"holiday" | "vacation" | "notice">("holiday");
  const [items, setItems] = useState<CalendarItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState<CalendarItem | null>(null);

const fetchItems = async () => {
    try {
      const res = await fetch("/api/calendar");
      if (!res.ok) throw new Error("Failed to fetch calendar items");
      const data: CalendarItem[] = await res.json();

      // Optionally, convert API dates to readable strings
      const formattedData = data.map(item => ({
        ...item,
        date: item.date ? new Date(item.date).toLocaleDateString() : undefined,
        start: item.start ? new Date(item.start).toLocaleDateString() : undefined,
        end: item.end ? new Date(item.end).toLocaleDateString() : undefined,
        reopen: item.reopen ? new Date(item.reopen).toLocaleDateString() : undefined,
      }));

      setItems(formattedData);
    } catch (err) {
      console.error("Error fetching calendar items:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    category: '',
    start: '',
    end: '',
    reopen: '',
    priority: 'medium',
    file: null
  });

  const handleSubmit = async () => {
    setLoading(true);
    
    const payload = { ...formData, type: activeTab };

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setFormData({
        title: '',
        description: '',
        date: '',
        category: '',
        start: '',
        end: '',
        reopen: '',
        priority: 'medium',
        file: null
      });
      fetchItems();
    }, 1000);
  };

  const handleInputChange = (field: keyof FormData, value: string | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDelete = async (id: string) => {
    // Simulate delete
    setItems(items.filter((item: CalendarItem) => item._id !== id));
  };

  const tabConfig = {
    holiday: { icon: Star, color: 'from-amber-500 to-orange-600', bgColor: 'bg-amber-50', textColor: 'text-amber-700' },
    vacation: { icon: Plane, color: 'from-blue-500 to-cyan-600', bgColor: 'bg-blue-50', textColor: 'text-blue-700' },
    notice: { icon: Bell, color: 'from-purple-500 to-pink-600', bgColor: 'bg-purple-50', textColor: 'text-purple-700' }
  } as const;

  const getTabStyle = (tab: string) => {
    const config = tabConfig[tab as keyof typeof tabConfig];
    return activeTab === tab 
      ? `bg-gradient-to-r ${config.color} text-white shadow-lg transform scale-105`
      : `bg-white ${config.textColor} hover:${config.bgColor} border border-gray-200`;
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredItems = items.filter((item: CalendarItem) => item.type === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Calendar Management
              </h1>
              <p className="text-gray-600 mt-1">Manage holidays, vacations, and important notices</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Plus className="w-6 h-6" />
                Add New Entry
              </h2>

              {/* Enhanced Tabs */}
              <div className="grid grid-cols-1 gap-3 mb-6">
                {(["holiday", "vacation", "notice"] as const).map((tab) => {
                  const IconComponent = tabConfig[tab].icon;
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${getTabStyle(tab)}`}
                    >
                      <IconComponent className="w-5 h-5" />
                      <span className="capitalize">{tab}</span>
                    </button>
                  );
                })}
              </div>

              {/* Enhanced Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input 
                    type="text" 
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter title..." 
                    className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea 
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Enter description..." 
                    rows={3}
                    className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  />
                </div>

                {activeTab === "holiday" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                      <input 
                        type="date" 
                        value={formData.date}
                        onChange={(e) => handleInputChange('date', e.target.value)}
                        className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <select 
                        value={formData.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="">Select Category</option>
                        <option value="religious">🕊️ Religious</option>
                        <option value="national">🏛️ National</option>
                        <option value="cultural">🎭 Cultural</option>
                        <option value="educational">📚 Educational</option>
                        <option value="celebration">🎉 Celebration</option>
                      </select>
                    </div>
                  </>
                )}

                {activeTab === "vacation" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                      <input 
                        type="date" 
                        value={formData.start}
                        onChange={(e) => handleInputChange('start', e.target.value)}
                        className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                      <input 
                        type="date" 
                        value={formData.end}
                        onChange={(e) => handleInputChange('end', e.target.value)}
                        className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Reopen Date</label>
                      <input 
                        type="date" 
                        value={formData.reopen}
                        onChange={(e) => handleInputChange('reopen', e.target.value)}
                        className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                      />
                    </div>
                  </>
                )}

                {activeTab === "notice" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                      <select 
                        value={formData.priority}
                        onChange={(e) => handleInputChange('priority', e.target.value)}
                        className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="high">🔴 High Priority</option>
                        <option value="medium">🟡 Medium Priority</option>
                        <option value="low">🟢 Low Priority</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Attachment</label>
                      <input 
                        type="file" 
                        onChange={(e) => handleInputChange('file', e.target.files?.[0] || null)}
                        className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                      />
                    </div>
                  </>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={loading || !formData.title.trim()}
                  className={`w-full py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                    loading || !formData.title.trim()
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : `bg-gradient-to-r ${tabConfig[activeTab].color} hover:shadow-lg transform hover:scale-105`
                  } text-white`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Saving...
                    </div>
                  ) : (
                    "Save Entry")}
                </button>
            </div>
          </div>

          {/* Display Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  {React.createElement(tabConfig[activeTab].icon, { className: "w-6 h-6" })}
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Entries
                </h2>
                <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {filteredItems.length} items
                </div>
              </div>

              {filteredItems.length === 0 ? (
                <div className="text-center py-12">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${tabConfig[activeTab].bgColor} flex items-center justify-center`}>
                    {React.createElement(tabConfig[activeTab].icon, { 
                      className: `w-8 h-8 ${tabConfig[activeTab].textColor}` 
                    })}
                  </div>
                  <p className="text-gray-500 text-lg">No {activeTab} entries yet</p>
                  <p className="text-gray-400 text-sm mt-1">Create your first entry using the form</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredItems.map((item: CalendarItem) => (
                    <div key={item._id} className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-200">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-bold text-lg text-gray-800">{item.title}</h3>
                            {item.priority && (
                              <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(item.priority)}`}>
                                {item.priority.toUpperCase()}
                              </span>
                            )}
                          </div>
                          
                          <div className="text-sm text-gray-600 space-y-1">
                            {item.date && (
                              <p><span className="font-medium">Date:</span> {item.date}</p>
                            )}
                            {item.start && item.end && (
                              <p><span className="font-medium">Duration:</span> {item.start} to {item.end}</p>
                            )}
                            {item.reopen && (
                              <p><span className="font-medium">Reopen:</span> {item.reopen}</p>
                            )}
                            {item.category && (
                              <p><span className="font-medium">Category:</span> {item.category}</p>
                            )}
                            {item.description && (
                              <p className="mt-2"><span className="font-medium">Description:</span> {item.description}</p>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex gap-2 ml-4">
                          <button 
                            onClick={() => setEditingItem(item)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
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
          </div>
        </div>
      </div>
    </div>
    </div>
  );

}