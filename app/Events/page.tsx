'use client';
import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, Star, Search, ChevronRight, Bookmark, BookmarkCheck } from 'lucide-react';

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

const categoryColors: { [key: string]: string } = {
  Academic: 'bg-blue-100 text-blue-800 border-blue-200',
  Sports: 'bg-green-100 text-green-800 border-green-200',
  Cultural: 'bg-pink-100 text-pink-800 border-pink-200',
  Workshop: 'bg-purple-100 text-purple-800 border-purple-200'
};

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedEvents, setBookmarkedEvents] = useState<string[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error(err));
  }, []);

  const toggleBookmark = (eventId: string) => {
    setBookmarkedEvents(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  const filteredEvents = events.filter(event => {
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredEvents = events.filter(event => event.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Upcoming Events</h1>
          <p className="text-gray-600 text-lg">Discover and participate in exciting school activities</p>
        </div>

        {/* Featured Events */}
        {featuredEvents.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Star className="w-6 h-6 text-yellow-500 mr-2" /> Featured Events
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {featuredEvents.map(event => (
                <div
                  key={event._id}
                  className={`relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${event.image}`}
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                  <div className="absolute top-4 right-4">
                    <button
                      onClick={e => { e.stopPropagation(); toggleBookmark(event._id); }}
                      className="p-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full hover:bg-opacity-30 transition-all"
                    >
                      {bookmarkedEvents.includes(event._id) ? (
                        <BookmarkCheck className="w-5 h-5 text-white" />
                      ) : (
                        <Bookmark className="w-5 h-5 text-white" />
                      )}
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{event.title}</h3>
                    <p className="text-sm opacity-90">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-3 rounded-xl whitespace-nowrap font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event, index) => (
            <div
              key={event._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden cursor-pointer"
              onClick={() => setSelectedEvent(event)}
            >
              <div className={`${event.image} h-32 relative`}>
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="absolute top-3 left-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${categoryColors[event.category] || 'bg-gray-100 text-gray-700 border-gray-200'}`}>
                    {event.category}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{event.title}</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" /> {event.date}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2" /> {event.time}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" /> {event.venue}
                  </div>
                </div>
                <p className="text-gray-700 text-sm mb-4 line-clamp-2">{event.description}</p>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No events found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
