'use client';
import { useEffect, useState } from 'react';
import { Calendar, Bell, X, ChevronRight } from 'lucide-react';

interface Announcement {
  _id: string;
  title: string;
  date: string;
  description: string;
  priority?: 'high' | 'medium' | 'low';
  category?: string;
  files?: { url: string; name: string }[];
}

const priorityStyle = {
  high:   'bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-900/20 dark:text-orange-300',
  medium: 'bg-amber-100  text-amber-800  border-amber-300  dark:bg-amber-900/20  dark:text-amber-300',
  low:    'bg-orange-50  text-orange-600 border-orange-200 dark:bg-orange-900/10 dark:text-orange-400',
};

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements]       = useState<Announcement[]>([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [filter, setFilter]                     = useState<string>('all');

  useEffect(() => {
    fetch('/api/announcements')
      .then(r => r.json())
      .then(setAnnouncements)
      .catch(console.error);
  }, []);

  const categories: string[] = [
    'all',
    ...Array.from(new Set(announcements.map(a => a.category).filter((c): c is string => Boolean(c)))),
  ];

  const filtered = filter === 'all'
    ? announcements
    : announcements.filter(a => a.category === filter);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">

      {/* ── Hero ── */}
      <div className="w-full bg-gradient-to-r from-orange-600 to-amber-500 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/15
            rounded-2xl mb-5 border border-white/20">
            <Bell className="w-8 h-8 text-white" />
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-100 mb-3">
            School Notices
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Announcements</h1>
          <p className="text-orange-100 text-lg max-w-xl mx-auto">
            Stay updated with the latest news, notices, and school communications.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        {/* ── Filter tabs ── */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border-2 ${
                filter === cat
                  ? 'bg-orange-600 border-orange-600 text-white shadow-md'
                  : 'bg-white dark:bg-gray-900 border-orange-100 dark:border-orange-900/40 text-gray-700 dark:text-gray-300 hover:border-orange-300 hover:bg-orange-50'
              }`}
            >
              {cat === 'all' ? 'All Announcements' : cat}
            </button>
          ))}
        </div>

        {/* ── Grid ── */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-orange-50 dark:bg-orange-900/10 rounded-2xl
            border border-orange-100 dark:border-orange-900/30">
            <Bell className="mx-auto w-12 h-12 text-orange-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No announcements found</h3>
            <p className="text-gray-500">Try selecting a different category.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((ann) => (
              <div
                key={ann._id}
                className="group bg-white dark:bg-gray-900 border-2 border-orange-100 dark:border-orange-900/30
                  rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="p-6">
                  {/* Badges */}
                  <div className="flex items-center gap-2 flex-wrap mb-4">
                    {ann.category && (
                      <span className="bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300
                        text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full border border-orange-200 dark:border-orange-800">
                        {ann.category}
                      </span>
                    )}
                    {ann.priority && (
                      <span className={`text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full border ${priorityStyle[ann.priority]}`}>
                        {ann.priority}
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-orange-600
                    transition-colors mb-2 leading-snug text-lg">
                    {ann.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                    <Calendar className="w-3.5 h-3.5 text-orange-400" />
                    {ann.date}
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
                    {ann.description}
                  </p>
                </div>

                <div className="px-6 pb-6">
                  <button
                    onClick={() => setSelectedAnnouncement(ann)}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2.5 px-4 rounded-xl
                      font-semibold transition-colors text-sm flex items-center justify-center gap-2 group/btn"
                  >
                    Read Full Details
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Modal ── */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full
            max-h-[90vh] overflow-hidden border border-orange-100 dark:border-orange-900/40">
            {/* Header */}
            <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-orange-100
              dark:border-orange-900/40 p-6 flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {selectedAnnouncement.title}
                </h2>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Calendar className="w-3.5 h-3.5 text-orange-400" />
                  {selectedAnnouncement.date}
                </div>
              </div>
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full
                  hover:bg-orange-50 dark:hover:bg-orange-900/20 text-gray-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-10rem)]">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {selectedAnnouncement.description}
              </p>

              {selectedAnnouncement.files?.length ? (
                <div className="mt-6 p-4 bg-orange-50 dark:bg-orange-900/10 rounded-xl
                  border border-orange-100 dark:border-orange-900/30">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">Attachments</h4>
                  <ul className="space-y-2">
                    {selectedAnnouncement.files.map((file, idx) => (
                      <li key={idx}>
                        <a href={file.url} target="_blank" rel="noopener noreferrer"
                          className="text-orange-600 hover:text-orange-700 underline text-sm font-medium">
                          {file.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white dark:bg-gray-900 border-t border-orange-100
              dark:border-orange-900/40 p-4">
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2.5 rounded-xl
                  font-semibold text-sm transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
