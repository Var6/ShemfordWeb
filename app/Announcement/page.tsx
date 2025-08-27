'use client';
import { useState } from 'react';
import { Calendar, Bell, X, ChevronRight } from 'lucide-react';

interface Announcement {
  id: number;
  title: string;
  date: string;
  description: string;
  priority?: 'high' | 'medium' | 'low';
  category?: string;
}

const announcements: Announcement[] = [
  {
    id: 1,
    title: 'Final Exam Date Sheet Released',
    date: 'March 15, 2025',
    description: 'The final exam date sheet for all grades has been published. Students are advised to check the schedule and prepare accordingly. Please note that the exam timings have been updated to accommodate the new schedule.',
    priority: 'high',
    category: 'Academics'
  },
  {
    id: 2,
    title: 'Science Syllabus Update - Grade 10',
    date: 'March 10, 2025',
    description: 'A minor update has been made to the syllabus for Grade 10 Science. The changes include additional topics in Physics and Chemistry sections. Please download the latest syllabus from the student portal.',
    priority: 'medium',
    category: 'Curriculum'
  },
  {
    id: 3,
    title: 'Annual Sports Day Registration',
    date: 'March 8, 2025',
    description: 'Registration for the Annual Sports Day is now open. Students can participate in various events including track and field, basketball, and swimming. Registration closes on March 25th.',
    priority: 'low',
    category: 'Events'
  },
  {
    id: 4,
    title: 'Library Hours Extended',
    date: 'March 5, 2025',
    description: 'The school library will now remain open until 8 PM on weekdays to accommodate students preparing for final exams. Additional study spaces have been arranged.',
    priority: 'medium',
    category: 'Facilities'
  },
];

const priorityColors = {
  high: 'bg-red-100 text-red-800 border-red-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  low: 'bg-green-100 text-green-800 border-green-200'
};

const categoryColors = {
  'Academics': 'bg-blue-50 text-blue-700',
  'Curriculum': 'bg-purple-50 text-purple-700',
  'Events': 'bg-orange-50 text-orange-700',
  'Facilities': 'bg-teal-50 text-teal-700'
};

export default function AnnouncementsPage() {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const filteredAnnouncements = filter === 'all' 
    ? announcements 
    : announcements.filter(ann => ann.category === filter);

  const categories = ['all', ...Array.from(new Set(announcements.map(ann => ann.category)))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
            <Bell className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            School Announcements
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Stay updated with the latest news and updates
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category ?? ''}
              onClick={() => setFilter(category ?? '')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                filter === (category ?? '')
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {category === 'all' ? 'All Announcements' : category}
            </button>
          ))}
        </div>

        {/* Announcements Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAnnouncements.map((announcement, index) => (
            <div
              key={announcement.id}
              className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700 overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Card Header */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-3">
                  {announcement.category && (
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      categoryColors[announcement.category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-700'
                    }`}>
                      {announcement.category}
                    </span>
                  )}
                  {announcement.priority && (
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${
                      priorityColors[announcement.priority]
                    }`}>
                      {announcement.priority.toUpperCase()}
                    </span>
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {announcement.title}
                </h3>
                
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-4">
                  <Calendar className="w-4 h-4 mr-2" />
                  {announcement.date}
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
                  {announcement.description}
                </p>
              </div>

              {/* Card Footer */}
              <div className="px-6 pb-6">
                <button
                  onClick={() => setSelectedAnnouncement(announcement)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center group"
                >
                  Read Full Details
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAnnouncements.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              No announcements found
            </h3>
            <p className="text-gray-500">
              Try selecting a different category to see more announcements.
            </p>
          </div>
        )}

        {/* Modal */}
        {selectedAnnouncement && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 rounded-t-2xl">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {selectedAnnouncement.category && (
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                          categoryColors[selectedAnnouncement.category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-700'
                        }`}>
                          {selectedAnnouncement.category}
                        </span>
                      )}
                      {selectedAnnouncement.priority && (
                        <span className={`px-3 py-1 text-xs font-medium rounded-full border ${
                          priorityColors[selectedAnnouncement.priority]
                        }`}>
                          {selectedAnnouncement.priority.toUpperCase()}
                        </span>
                      )}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {selectedAnnouncement.title}
                    </h2>
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <Calendar className="w-4 h-4 mr-2" />
                      {selectedAnnouncement.date}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedAnnouncement(null)}
                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                  {selectedAnnouncement.description}
                </p>
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-6 rounded-b-2xl">
                <button
                  onClick={() => setSelectedAnnouncement(null)}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}