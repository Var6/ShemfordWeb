'use client';
import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, Star, Search, Bookmark, BookmarkCheck } from 'lucide-react';

interface Event {
  _id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  category: string;
  venue: string;
  capacity: number;
  registered: number;
  featured: boolean;
  image: string;
  registerLink: string;
  organizer: string;
}

const categories = ['All', 'Academic', 'Sports', 'Cultural', 'Workshop'];

export default function EventsPage() {
  const [events, setEvents]               = useState<Event[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery]     = useState('');
  const [bookmarkedEvents, setBookmarkedEvents] = useState<string[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    fetch('/api/events')
      .then(r => r.json())
      .then(setEvents)
      .catch(console.error);
  }, []);

  const toggleBookmark = (id: string) =>
    setBookmarkedEvents(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const filteredEvents = events.filter(e => {
    const matchCat    = selectedCategory === 'All' || e.category === selectedCategory;
    const matchSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        e.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const featuredEvents = events.filter(e => e.featured);

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
            School Events
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Upcoming Events</h1>
          <p className="text-orange-100 text-lg max-w-xl mx-auto">
            Discover and participate in exciting school activities and programmes.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        {/* ── Featured ── */}
        {featuredEvents.length > 0 && (
          <div className="mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-600 mb-2">Highlights</p>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Star className="w-5 h-5 text-orange-500" /> Featured Events
            </h2>
            <div className="grid gap-5 md:grid-cols-2">
              {featuredEvents.map(event => (
                <div
                  key={event._id}
                  onClick={() => setSelectedEvent(event)}
                  className={`relative h-48 overflow-hidden rounded-2xl cursor-pointer group
                    shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${event.image}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <button
                    onClick={e => { e.stopPropagation(); toggleBookmark(event._id); }}
                    className="absolute top-4 right-4 w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full
                      flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    {bookmarkedEvents.includes(event._id)
                      ? <BookmarkCheck className="w-4 h-4 text-white" />
                      : <Bookmark className="w-4 h-4 text-white" />}
                  </button>
                  <div className="absolute bottom-5 left-5 text-white">
                    <h3 className="font-bold text-lg mb-0.5">{event.title}</h3>
                    <p className="text-sm text-white/80">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Search + Filters ── */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-400" />
            <input
              type="text"
              placeholder="Search events…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white dark:bg-gray-900 border border-orange-200
                dark:border-orange-800 rounded-xl text-sm text-gray-900 dark:text-white
                placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border-2 ${
                  selectedCategory === cat
                    ? 'bg-orange-600 border-orange-600 text-white shadow-md'
                    : 'bg-white dark:bg-gray-900 border-orange-100 dark:border-orange-900/40 text-gray-700 dark:text-gray-300 hover:border-orange-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── Events Grid ── */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-20 bg-orange-50 dark:bg-orange-900/10 rounded-2xl
            border border-orange-100 dark:border-orange-900/30">
            <Calendar className="mx-auto w-12 h-12 text-orange-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No events found</h3>
            <p className="text-gray-500">Try adjusting your search or filter.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map(event => (
              <div
                key={event._id}
                onClick={() => setSelectedEvent(event)}
                className="group bg-white dark:bg-gray-900 border-2 border-orange-100 dark:border-orange-900/30
                  rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Image banner */}
                <div className={`${event.image} h-36 relative bg-gradient-to-br from-orange-200 to-amber-200`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-orange-500 text-white text-[10px] font-bold uppercase
                      tracking-wide px-2.5 py-1 rounded-full">
                      {event.category}
                    </span>
                  </div>
                  <button
                    onClick={e => { e.stopPropagation(); toggleBookmark(event._id); }}
                    className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full
                      flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    {bookmarkedEvents.includes(event._id)
                      ? <BookmarkCheck className="w-4 h-4 text-white" />
                      : <Bookmark className="w-4 h-4 text-white" />}
                  </button>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-orange-600
                    transition-colors mb-3 leading-snug">
                    {event.title}
                  </h3>
                  <div className="space-y-1.5 mb-4">
                    {[
                      { icon: <Calendar className="w-3.5 h-3.5" />, val: event.date },
                      { icon: <Clock    className="w-3.5 h-3.5" />, val: event.time },
                      { icon: <MapPin   className="w-3.5 h-3.5" />, val: event.venue },
                    ].map((row, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <span className="text-orange-400">{row.icon}</span>
                        {row.val}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
