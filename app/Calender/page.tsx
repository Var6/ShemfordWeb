'use client';
import { useState, useEffect } from 'react';
import {
  Calendar, Download, Bell, Clock, Sun, Filter, Search,
  ChevronDown, ChevronUp, BookOpen, MapPin,
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

const formatDate = (s?: string) => {
  if (!s) return '';
  const d = new Date(s);
  if (isNaN(d.getTime())) return s;
  return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' });
};

const priorityBorder: Record<string, string> = {
  high:   'border-l-orange-500',
  medium: 'border-l-amber-400',
  low:    'border-l-orange-300',
};

export default function CalendarPage() {
  const [searchTerm, setSearchTerm]       = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showUpcoming, setShowUpcoming]   = useState(true);
  const [currentTime, setCurrentTime]     = useState(new Date());
  const [calendarItems, setCalendarItems] = useState<CalendarItem[]>([]);

  useEffect(() => {
    fetch('/api/calendar').then(r => r.json()).then(setCalendarItems).catch(console.error);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  const filteredHolidays = calendarItems
    .filter(i => ['religious', 'national', 'cultural', 'educational'].includes(i.category))
    .filter(i => i.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(i => filterCategory === 'all' || i.category === filterCategory)
    .sort((a, b) => (!a.date || !b.date) ? 0 : new Date(a.date).getTime() - new Date(b.date).getTime());

  const vacations = calendarItems
    .filter(i => i.category === 'vacation')
    .sort((a, b) => (!a.start || !b.start) ? 0 : new Date(a.start).getTime() - new Date(b.start).getTime());

  const notices = calendarItems.filter(i => ['academic', 'events'].includes(i.category));

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">

      {/* ── Hero ── */}
      <div className="w-full bg-gradient-to-r from-orange-600 to-amber-500 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/15
            rounded-2xl mb-5 border border-white/20">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-100 mb-3">
            Academic Year
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">School Calendar</h1>
          <p className="text-orange-100 text-lg max-w-xl mx-auto">
            Holidays, vacations, and important notices — all in one place.
          </p>
          <p className="mt-3 text-sm text-orange-200">
            {currentTime.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">

        {/* ── Search & Filter ── */}
        <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-100
          dark:border-orange-900/30 rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search holidays…"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-orange-200
                  dark:border-orange-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-400 w-4 h-4" />
              <select
                value={filterCategory}
                onChange={e => setFilterCategory(e.target.value)}
                className="pl-11 pr-6 py-3 rounded-xl border border-orange-200 dark:border-orange-800
                  bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                  focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
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

        {/* ── Download Centre ── */}
        {notices.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center">
                <Download className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Download Centre</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Important documents and notices</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notices.map(notice => (
                <div
                  key={notice._id}
                  className={`bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border-2
                    border-orange-100 dark:border-orange-900/30 border-l-4
                    ${priorityBorder[notice.priority || ''] || 'border-l-orange-400'}
                    hover:shadow-md transition-shadow`}
                >
                  <div className="flex items-start justify-between mb-4 gap-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white leading-snug">
                      {notice.title}
                    </h3>
                    {notice.priority && (
                      <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-1
                        bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300
                        border border-orange-200 dark:border-orange-800 rounded-full flex-shrink-0">
                        {notice.priority}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                    {notice.description}
                  </p>
                  {notice.files && notice.files.length > 0 && (
                    <div className="space-y-2">
                      {notice.files.map((file, idx) => (
                        <a
                          key={idx}
                          href={file.url}
                          download
                          className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600
                            hover:bg-orange-700 text-white text-sm rounded-xl transition-colors"
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
        )}

        {/* ── Upcoming Holidays ── */}
        <section>
          <div className="flex items-center justify-between mb-6 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Upcoming Holidays</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Festival and celebration dates</p>
              </div>
            </div>
            <button
              onClick={() => setShowUpcoming(!showUpcoming)}
              className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700
                text-white rounded-xl text-sm font-semibold transition-colors flex-shrink-0"
            >
              {showUpcoming ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              {showUpcoming ? 'Hide' : 'Show'}
            </button>
          </div>

          {showUpcoming && (
            filteredHolidays.length === 0 ? (
              <div className="text-center py-16 bg-orange-50 dark:bg-orange-900/10 rounded-2xl
                border border-orange-100 dark:border-orange-900/30">
                <Bell className="mx-auto w-10 h-10 text-orange-300 mb-3" />
                <p className="text-gray-500">No holidays match your filter.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredHolidays.map(holiday => (
                  <div
                    key={holiday._id}
                    className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border-2
                      border-orange-100 dark:border-orange-900/30 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-xl
                        flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-orange-600" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wide px-2.5 py-1
                        bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300
                        border border-orange-200 dark:border-orange-800 rounded-full">
                        {holiday.category}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2 leading-snug">
                      {holiday.title}
                    </h3>
                    {holiday.date && (
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <Clock className="w-3.5 h-3.5 text-orange-400" />
                        {formatDate(holiday.date)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )
          )}
        </section>

        {/* ── Vacation Schedule ── */}
        {vacations.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center">
                <Sun className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Vacation Schedule</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Plan your breaks and holidays</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {vacations.map(vacation => (
                <div
                  key={vacation._id}
                  className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border-2
                    border-orange-100 dark:border-orange-900/30 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-xl
                      flex items-center justify-center flex-shrink-0">
                      <Sun className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1 leading-snug">
                        {vacation.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{vacation.description}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {vacation.start && vacation.end && (
                      <div className="flex flex-wrap items-center justify-between gap-2 p-3
                        bg-orange-50 dark:bg-orange-900/10 rounded-xl">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Duration</span>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          {formatDate(vacation.start)} → {formatDate(vacation.end)}
                        </span>
                      </div>
                    )}
                    {vacation.reopen && (
                      <div className="flex flex-wrap items-center justify-between gap-2 p-3
                        bg-amber-50 dark:bg-amber-900/10 rounded-xl">
                        <span className="text-sm font-medium text-amber-700 dark:text-amber-300">Reopens</span>
                        <span className="text-sm font-semibold text-amber-800 dark:text-amber-200">
                          {formatDate(vacation.reopen)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Footer ── */}
        <div className="text-center py-8 border-t border-orange-100 dark:border-orange-900/30">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-9 h-9 bg-orange-100 dark:bg-orange-900/20 rounded-xl
              flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-orange-600" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-900 dark:text-white text-sm">School Administration</p>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <MapPin className="w-3 h-3" />
                Patna, Bihar, India
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-400">Stay updated with all school notifications</p>
        </div>
      </div>
    </div>
  );
}
