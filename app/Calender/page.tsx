'use client';
import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Download,
  Bell,
  Clock,
  BookOpen,
  Sun,
  Filter,
  Search,
  ChevronDown,
  ChevronUp,
  MapPin,
} from 'lucide-react';

interface CalendarItem {
  _id: string;
  title: string;
  date?: string;
  start?: string;
  end?: string;
  reopen?: string;
  category: string;
  description: string;
  priority?: string;
  files?: { url: string; name: string }[];
}

const NotificationPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showUpcoming, setShowUpcoming] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [calendarItems, setCalendarItems] = useState<CalendarItem[]>([]);

  // Helper: format dates nicely
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString; // fallback
    return date.toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  // Fetch calendar items from API
  useEffect(() => {
    async function fetchCalendar() {
      const res = await fetch('/api/calendar');
      const data = await res.json();
      setCalendarItems(data);
    }
    fetchCalendar();
  }, []);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Filter & sort
  const filteredHolidays = calendarItems
    .filter(item =>
      ['religious', 'national', 'cultural', 'educational'].includes(item.category)
    )
    .filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(item => filterCategory === 'all' || item.category === filterCategory)
    .sort((a, b) => {
      if (!a.date || !b.date) return 0;
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

  const vacations = calendarItems
    .filter(item => item.category === 'vacation')
    .sort((a, b) => {
      if (!a.start || !b.start) return 0;
      return new Date(a.start).getTime() - new Date(b.start).getTime();
    });

  const notices = calendarItems.filter(item =>
    ['academic', 'events'].includes(item.category)
  );

  const getPriorityColor = (priority: string | undefined) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-400';
      case 'medium':
        return 'border-l-yellow-400';
      case 'low':
        return 'border-l-green-400';
      default:
        return 'border-l-blue-400';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                School Notifications
              </h1>
              <p className="text-gray-600 mt-1">
                {currentTime.toLocaleDateString('en-GB', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-12">
        {/* Search & Filter */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search holidays..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterCategory}
                onChange={e => setFilterCategory(e.target.value)}
                className="pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors bg-white"
              >
                <option value="all">All Categories</option>
                <option value="religious">Religious</option>
                <option value="national">National</option>
                <option value="cultural">Cultural</option>
                <option value="educational">Educational</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notices */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
              <Download className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Download Center</h2>
              <p className="text-gray-600">Important documents and notices</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notices.map(notice => (
              <div
                key={notice._id}
                className={`bg-white rounded-xl p-6 shadow-sm border-l-4 ${getPriorityColor(
                  notice.priority
                )} hover:shadow-md transition-shadow`}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-semibold text-lg text-gray-900">
                    {notice.title}
                  </h3>
                  {notice.priority && (
                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                      {notice.priority.toUpperCase()}
                    </span>
                  )}
                </div>

                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {notice.description}
                </p>

                {notice.files && notice.files.length > 0 && (
                  <div className="space-y-2">
                    {notice.files.map((file, idx) => (
                      <a
                        key={idx}
                        href={file.url}
                        download
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        {file.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Holidays */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Upcoming Holidays</h2>
                <p className="text-gray-600">Festival and celebration dates</p>
              </div>
            </div>

            <button
              onClick={() => setShowUpcoming(!showUpcoming)}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              {showUpcoming ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              {showUpcoming ? 'Hide' : 'Show'}
            </button>
          </div>

          {showUpcoming && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHolidays.map(holiday => (
                <div
                  key={holiday._id}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                      {holiday.category.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    {holiday.title}
                  </h3>

                  {holiday.date && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {formatDate(holiday.date)}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Vacations */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
              <Sun className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Vacation Schedule</h2>
              <p className="text-gray-600">Plan your breaks and holidays</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {vacations.map(vacation => (
              <div
                key={vacation._id}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Sun className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">
                      {vacation.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{vacation.description}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {vacation.start && vacation.end && (
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Duration</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {formatDate(vacation.start)} → {formatDate(vacation.end)}
                      </span>
                    </div>
                  )}
                  {vacation.reopen && (
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium text-green-700">Reopens</span>
                      <span className="text-sm font-semibold text-green-800">
                        {formatDate(vacation.reopen)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-8 border-t">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">School Administration</h3>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <MapPin className="w-3 h-3" />
                <span>Patna, Bihar, India</span>
              </div>
            </div>
          </div>
          <p className="text-gray-500 text-sm">
            Stay updated with all school notifications
          </p>
        </footer>
      </div>
    </div>
  );
};

export default NotificationPage;
