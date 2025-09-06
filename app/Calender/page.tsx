'use client';
import React, { useState, useEffect } from 'react';
import { Calendar, Download, Bell, Clock, BookOpen, Sun, Filter, Search, ChevronDown, ChevronUp, MapPin } from 'lucide-react';

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

  // Filter by category & search
  const filteredHolidays = calendarItems
    .filter(item => ['religious', 'national', 'cultural', 'educational'].includes(item.category))
    .filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(item => filterCategory === 'all' || item.category === filterCategory);

  const vacations = calendarItems.filter(item => item.category === 'vacation');

  const notices = calendarItems.filter(item => ['academic', 'events'].includes(item.category));

  const getPriorityColor = (priority: string | undefined) => {
    switch (priority) {
      case 'high':
        return 'border-red-500 bg-red-50';
      case 'medium':
        return 'border-yellow-500 bg-yellow-50';
      case 'low':
        return 'border-green-500 bg-green-50';
      default:
        return 'border-gray-300 bg-white';
    }
  };

  const AnimatedCard: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({
    children,
    className = '',
    delay = 0,
  }) => (
    <div className={`transform hover:scale-105 transition-all duration-300 ease-out ${className}`} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen transition-all duration-500 pt-10 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
              <Bell className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                School Notifications
              </h1>
              <p className="text-sm text-gray-600">
                {currentTime.toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  weekday: 'long',
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-12">
        {/* Search & Filter */}
        <div className="bg-white/70 rounded-2xl p-6 border border-gray-200 shadow-xl">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search holidays..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterCategory}
                onChange={e => setFilterCategory(e.target.value)}
                className="pl-10 pr-8 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-blue-500 transition-all duration-300"
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
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              📋 Download Center
            </h2>
            <p className="text-gray-600 text-lg">Access important documents and notices</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {notices.map((notice, index) => (
              <AnimatedCard key={notice._id} delay={index * 100}>
                <div className={`h-full p-6 rounded-2xl border-2 ${getPriorityColor(notice.priority)} shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
                      <Download className="w-6 h-6 text-white" />
                    </div>
                    {notice.priority && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                        {notice.priority.toUpperCase()}
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-xl text-gray-900 mb-3">{notice.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{notice.description}</p>

                  {notice.files && notice.files.length > 0 && (
                    <div className="space-y-2">
                      {notice.files.map((file, idx) => (
                        <a
                          key={idx}
                          href={file.url}
                          download
                          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          {file.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </AnimatedCard>
            ))}
          </div>
        </section>

        {/* Holidays */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-4">
              🎉 Upcoming Holidays
            </h2>
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={() => setShowUpcoming(!showUpcoming)}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-xl hover:from-green-600 hover:to-teal-700 transition-all duration-300 shadow-lg"
              >
                {showUpcoming ? <ChevronUp className="w-4 h-4 mr-2" /> : <ChevronDown className="w-4 h-4 mr-2" />}
                {showUpcoming ? 'Hide' : 'Show'} Details
              </button>
            </div>
          </div>

          {showUpcoming && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
              {filteredHolidays.map((holiday, index) => (
                <AnimatedCard key={holiday._id} delay={index * 50}>
                  <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 opacity-90"></div>
                    <div className="relative p-6 text-white">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-white/20 rounded-lg">
                          <Calendar className="w-6 h-6" />
                        </div>
                        <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold">
                          {holiday.category.toUpperCase()}
                        </span>
                      </div>
                      <h3 className="font-bold text-xl mb-2">{holiday.title}</h3>
                      {holiday.date && (
                        <div className="flex items-center justify-between">
                          <p className="text-lg font-semibold">{holiday.date}</p>
                          <div className="p-2 bg-white/20 rounded-full">
                            <Clock className="w-5 h-5" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          )}
        </section>

        {/* Vacations */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
              🏖️ Vacation Schedule
            </h2>
            <p className="text-gray-600 text-lg">Plan your breaks and holidays</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {vacations.map((vacation, index) => (
              <AnimatedCard key={vacation._id} delay={index * 150}>
                <div className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200">
                  <div className="h-2 bg-gradient-to-r from-yellow-400 to-orange-500"></div>
                  <div className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="p-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl shadow-lg mr-4">
                        <Sun className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-2xl text-gray-900 mb-1">{vacation.title}</h3>
                        <p className="text-gray-600">{vacation.description}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {vacation.start && vacation.end && (
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                          <span className="font-semibold text-gray-700">Duration:</span>
                          <span className="text-gray-900 font-bold">
                            {vacation.start} to {vacation.end}
                          </span>
                        </div>
                      )}
                      {vacation.reopen && (
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-200">
                          <span className="font-semibold text-green-700">Reopens:</span>
                          <span className="text-green-900 font-bold">{vacation.reopen}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-12 border-t border-gray-200">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg mb-4">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">School Administration</h3>
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>Patna, Bihar, India</span>
            </div>
          </div>
          <p className="text-gray-500">Stay updated with all school notifications and important dates</p>
        </footer>
      </div>
    </div>
  );
};

export default NotificationPage;
