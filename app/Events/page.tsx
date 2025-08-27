'use client';
import { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Star, Filter, Search, ChevronRight, Bookmark, BookmarkCheck } from 'lucide-react';

interface Event {
  id: number;
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
  organizer: string;
}

const events: Event[] = [
  {
    id: 1,
    title: 'Science Fair 2025',
    date: 'March 20, 2025',
    time: '9:00 AM - 5:00 PM',
    description: 'Showcase your innovative projects and compete with fellow students. This annual event brings together the brightest minds to display cutting-edge research and creative solutions.',
    category: 'Academic',
    venue: 'Main Auditorium',
    capacity: 200,
    registered: 150,
    featured: true,
    image: 'bg-gradient-to-br from-blue-500 to-purple-600',
    organizer: 'Science Department'
  },
  {
    id: 2,
    title: 'Annual Sports Meet',
    date: 'April 5, 2025',
    time: '8:00 AM - 6:00 PM',
    description: 'Join us for an action-packed sports event featuring athletics, team sports, and individual competitions. Open to all grade levels with exciting prizes.',
    category: 'Sports',
    venue: 'Sports Complex',
    capacity: 500,
    registered: 320,
    featured: false,
    image: 'bg-gradient-to-br from-green-500 to-teal-600',
    organizer: 'Sports Department'
  },
  {
    id: 3,
    title: 'Cultural Fest 2025',
    date: 'May 10, 2025',
    time: '6:00 PM - 10:00 PM',
    description: 'Experience diverse cultural performances including dance, music, drama, and art exhibitions. A celebration of creativity and cultural diversity.',
    category: 'Cultural',
    venue: 'Open Grounds',
    capacity: 800,
    registered: 450,
    featured: true,
    image: 'bg-gradient-to-br from-pink-500 to-orange-500',
    organizer: 'Cultural Committee'
  },
  {
    id: 4,
    title: 'Tech Workshop: AI & ML',
    date: 'March 25, 2025',
    time: '2:00 PM - 5:00 PM',
    description: 'Learn about Artificial Intelligence and Machine Learning from industry experts. Hands-on workshop with practical demonstrations.',
    category: 'Workshop',
    venue: 'Computer Lab',
    capacity: 50,
    registered: 45,
    featured: false,
    image: 'bg-gradient-to-br from-indigo-500 to-blue-600',
    organizer: 'Tech Club'
  },
];

const categories = ['All', 'Academic', 'Sports', 'Cultural', 'Workshop'];

const categoryColors: { [key: string]: string } = {
  Academic: 'bg-blue-100 text-blue-800 border-blue-200',
  Sports: 'bg-green-100 text-green-800 border-green-200',
  Cultural: 'bg-pink-100 text-pink-800 border-pink-200',
  Workshop: 'bg-purple-100 text-purple-800 border-purple-200'
};

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedEvents, setBookmarkedEvents] = useState<number[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const toggleBookmark = (eventId: number) => {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Upcoming Events
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Discover and participate in exciting school activities
          </p>
        </div>

        {/* Featured Events Banner */}
        {featuredEvents.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <Star className="w-6 h-6 text-yellow-500 mr-2" />
              Featured Events
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {featuredEvents.map((event) => (
                <div
                  key={event.id}
                  className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className={`${event.image} h-48 relative`}>
                    <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                    <div className="absolute top-4 right-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(event.id);
                        }}
                        className="p-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full hover:bg-opacity-30 transition-all"
                      >
                        {bookmarkedEvents.includes(event.id) ? (
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
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-3 rounded-xl whitespace-nowrap font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
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
              key={event.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700 overflow-hidden cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setSelectedEvent(event)}
            >
              {/* Event Header */}
              <div className={`${event.image} h-32 relative`}>
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="absolute top-3 left-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${
                    categoryColors[event.category] || 'bg-gray-100 text-gray-700 border-gray-200'
                  }`}>
                    {event.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark(event.id);
                    }}
                    className="p-1.5 bg-white bg-opacity-20 backdrop-blur-sm rounded-full hover:bg-opacity-30 transition-all"
                  >
                    {bookmarkedEvents.includes(event.id) ? (
                      <BookmarkCheck className="w-4 h-4 text-white" />
                    ) : (
                      <Bookmark className="w-4 h-4 text-white" />
                    )}
                  </button>
                </div>
              </div>

              {/* Event Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                  {event.title}
                </h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4 mr-2" />
                    {event.date}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="w-4 h-4 mr-2" />
                    {event.time}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4 mr-2" />
                    {event.venue}
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                  {event.description}
                </p>

                {/* Registration Status */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Registration</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {event.registered}/{event.capacity}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Action Button */}
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center group">
                  View Details
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              No events found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}

        {/* Event Details Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className={`${selectedEvent.image} h-48 relative rounded-t-2xl`}>
                <div className="absolute inset-0 bg-black bg-opacity-40 rounded-t-2xl"></div>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-4 right-4 p-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full hover:bg-opacity-30 transition-all"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="absolute bottom-4 left-4 text-white">
                  <span className={`px-3 py-1 text-sm font-medium rounded-full border bg-white bg-opacity-20 backdrop-blur-sm text-white border-white border-opacity-30 mb-2 inline-block`}>
                    {selectedEvent.category}
                  </span>
                  <h2 className="text-2xl font-bold">{selectedEvent.title}</h2>
                </div>
              </div>

              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Calendar className="w-5 h-5 mr-3" />
                      <span>{selectedEvent.date}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Clock className="w-5 h-5 mr-3" />
                      <span>{selectedEvent.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <MapPin className="w-5 h-5 mr-3" />
                      <span>{selectedEvent.venue}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Users className="w-5 h-5 mr-3" />
                      <span>{selectedEvent.registered}/{selectedEvent.capacity} registered</span>
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      <strong>Organizer:</strong> {selectedEvent.organizer}
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">About This Event</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {selectedEvent.description}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => toggleBookmark(selectedEvent.id)}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center ${
                      bookmarkedEvents.includes(selectedEvent.id)
                        ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {bookmarkedEvents.includes(selectedEvent.id) ? (
                      <BookmarkCheck className="w-4 h-4 mr-2" />
                    ) : (
                      <Bookmark className="w-4 h-4 mr-2" />
                    )}
                    {bookmarkedEvents.includes(selectedEvent.id) ? 'Bookmarked' : 'Bookmark'}
                  </button>
                  <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
                    Register Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}