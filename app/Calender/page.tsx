'use client';
import React, { useState, useEffect } from 'react';
import { Calendar, Download, Bell, Clock, BookOpen, Sun, Moon, Filter, Search, ChevronDown, ChevronUp, Star, Gift, MapPin } from 'lucide-react';

const NotificationPage: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showUpcoming, setShowUpcoming] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const holidays = [
    { day: 'SUNDAY', date: '6th April 2025', holiday: 'RAM NAVAMI', category: 'religious', color: 'from-orange-400 to-red-500' },
    { day: 'MONDAY', date: '14th April 2025', holiday: 'AMBEDKAR JAYANTI', category: 'national', color: 'from-blue-400 to-indigo-500' },
    { day: 'SATURDAY', date: '7th June 2025', holiday: 'EID-UL-ADHA', category: 'religious', color: 'from-green-400 to-emerald-500' },
    { day: 'SUNDAY', date: '6th July 2025', holiday: 'MUHARRAM', category: 'religious', color: 'from-purple-400 to-indigo-500' },
    { day: 'SATURDAY', date: '9th August 2025', holiday: 'RAKSHA BANDHAN', category: 'cultural', color: 'from-pink-400 to-rose-500' },
    { day: 'FRIDAY', date: '15th August 2025', holiday: 'INDEPENDENCE DAY', category: 'national', color: 'from-orange-400 to-amber-500' },
    { day: 'SATURDAY', date: '16th August 2025', holiday: 'JANMASHTAMI', category: 'religious', color: 'from-blue-400 to-cyan-500' },
    { day: 'FRIDAY', date: '5th September 2025', holiday: 'TEACHER\'S DAY', category: 'educational', color: 'from-teal-400 to-green-500' },
    { day: 'WEDNESDAY', date: '17th September 2025', holiday: 'VISWAKARMA PUJA', category: 'cultural', color: 'from-yellow-400 to-orange-500' },
    { day: 'THURSDAY', date: '2nd October 2025', holiday: 'GANDHI JAYANTI', category: 'national', color: 'from-green-400 to-teal-500' },
    { day: 'TUESDAY', date: '21st October 2025', holiday: 'DIWALI', category: 'religious', color: 'from-yellow-400 to-amber-500' },
    { day: 'THURSDAY', date: '23rd October 2025', holiday: 'BHAI DOOJ', category: 'cultural', color: 'from-purple-400 to-pink-500' },
    { day: 'TUESDAY', date: '28th October 2025', holiday: 'CHHATH PUJA', category: 'religious', color: 'from-orange-400 to-red-500' },
    { day: 'WEDNESDAY', date: '5th November 2025', holiday: 'GURUNANAK JAYANTI', category: 'religious', color: 'from-blue-400 to-indigo-500' },
    { day: 'THURSDAY', date: '25th December 2025', holiday: 'CHRISTMAS', category: 'religious', color: 'from-red-400 to-green-500' },
    { day: 'THURSDAY', date: '1st January 2026', holiday: 'NEW YEAR DAY', category: 'celebration', color: 'from-purple-400 to-blue-500' },
  ];

  interface VacationType {
    name: string;
    start: string;
    end: string;
    reopen?: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    description: string;
  }

  const vacationDetails: VacationType[] = [
    { 
      name: 'SUMMER VACATION', 
      start: '22nd MAY 2025', 
      end: '14th JUNE 2025', 
      reopen: '16th JUNE 2025',
      icon: Sun,
      color: 'from-yellow-400 to-orange-500',
      description: 'Enjoy the sunny break!'
    },
    { 
      name: 'DURGA PUJA', 
      start: '29th SEPTEMBER 2025', 
      end: '4th OCTOBER 2025', 
      reopen: '6th OCTOBER 2025',
      icon: Gift,
      color: 'from-purple-400 to-pink-500',
      description: 'Festival celebrations'
    },
    { 
      name: 'DIWALI BREAK', 
      start: '20th OCTOBER 2025', 
      end: '29th OCTOBER 2025', 
      reopen: '30th OCTOBER 2025',
      icon: Star,
      color: 'from-yellow-400 to-amber-500',
      description: 'Festival of lights'
    },
    { 
      name: 'WINTER BREAK', 
      start: '25th DECEMBER 2025', 
      end: '1st JANUARY 2026', 
      reopen: '2nd JANUARY 2026',
      icon: Gift,
      color: 'from-blue-400 to-cyan-500',
      description: 'Holiday season break'
    },
  ];

  const notices = [
    {
      id: 1,
      title: "Holiday Schedule 2025-26",
      description: "Complete academic year holiday calendar with important dates and vacation periods.",
      url: "/docs/holiday-schedule.pdf",
      priority: "high",
      date: "2025-08-15",
      category: "academic"
    },
    {
      id: 2,
      title: "Examination Guidelines",
      description: "Updated examination procedures, dates, and important instructions for all students.",
      url: "/docs/exam-guidelines.pdf",
      priority: "medium",
      date: "2025-08-10",
      category: "academic"
    },
    {
      id: 3,
      title: "Sports Day Registration",
      description: "Annual sports day event registration now open. Participate in various competitions.",
      url: "/docs/sports-registration.pdf",
      priority: "low",
      date: "2025-08-05",
      category: "events"
    }
  ];

  const filteredHolidays = holidays.filter(holiday => 
    holiday.holiday.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterCategory === 'all' || holiday.category === filterCategory)
  );

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'border-red-500 bg-red-50 dark:bg-red-900/20';
      case 'medium': return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'low': return 'border-green-500 bg-green-50 dark:bg-green-900/20';
      default: return 'border-gray-300 bg-white dark:bg-gray-800';
    }
  };

  const AnimatedCard: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = "", delay = 0 }) => (
    <div 
      className={`transform hover:scale-105 transition-all duration-300 ease-out ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );

  return (
    <div className={`min-h-screen transition-all duration-500 ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'}`}>
      {/* Floating Header with Glass Effect */}
      <div className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
                <Bell className="w-6 h-6 text-white animate-pulse" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  School Notifications
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {currentTime.toLocaleDateString('en-GB', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric',
                    weekday: 'long'
                  }).replace(/(\d+) ([A-Za-z]+) (\d+)/, (match, day, month, year) => {
                    const dayNum = parseInt(day);
                    const suffix = dayNum === 1 || dayNum === 21 || dayNum === 31 ? 'st' :
                                  dayNum === 2 || dayNum === 22 ? 'nd' :
                                  dayNum === 3 || dayNum === 23 ? 'rd' : 'th';
                    return `${dayNum}${suffix} ${month} ${year}`;
                  })}
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110"
            >
              {darkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-700" />}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-12">
        {/* Hero Notice Banner with Animated Background */}
        <AnimatedCard className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 opacity-90"></div>
          <div className="absolute inset-0 bg-[url(data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%227%22%20cy%3D%227%22%20r%3D%222%22/%3E%3Ccircle%20cx%3D%2227%22%20cy%3D%227%22%20r%3D%222%22/%3E%3Ccircle%20cx%3D%2247%22%20cy%3D%227%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse"></div>
          <div className="relative p-8 text-white">
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-white/20 rounded-full backdrop-blur">
                <Bell className="w-8 h-8 animate-bounce" />
              </div>
              <h2 className="text-3xl font-bold">🎄 Important Holiday Notice!</h2>
            </div>
            <p className="text-xl opacity-95 leading-relaxed">
              The school will remain closed on <span className="font-bold underline">December 25th</span> for Christmas celebrations. 
              Wishing everyone a joyful holiday season! 🎅
            </p>
          </div>
        </AnimatedCard>

        {/* Enhanced Search and Filter Section */}
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-xl">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search holidays..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="pl-10 pr-8 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
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

        {/* Enhanced Download Notices Section */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              📋 Download Center
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">Access important documents and notices</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {notices.map((notice, index) => (
              <AnimatedCard key={notice.id} delay={index * 100}>
                <div className={`h-full p-6 rounded-2xl border-2 ${getPriorityColor(notice.priority)} shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
                      <Download className="w-6 h-6 text-white" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      notice.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                      notice.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    }`}>
                      {notice.priority.toUpperCase()}
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-3">
                    {notice.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {notice.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(notice.date).toLocaleDateString('en-GB', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric'
                      }).replace(/(\d+) ([A-Za-z]+) (\d+)/, (match, day, month, year) => {
                        const dayNum = parseInt(day);
                        const suffix = dayNum === 1 || dayNum === 21 || dayNum === 31 ? 'st' :
                                      dayNum === 2 || dayNum === 22 ? 'nd' :
                                      dayNum === 3 || dayNum === 23 ? 'rd' : 'th';
                        return `${dayNum}${suffix} ${month} ${year}`;
                      })}
                    </span>
                    <a
                      href={notice.url}
                      download
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </a>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </section>

        {/* Interactive Holidays Section */}
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHolidays.map((holiday, index) => (
                <AnimatedCard key={index} delay={index * 50}>
                  <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                    <div className={`absolute inset-0 bg-gradient-to-br ${holiday.color} opacity-90`}></div>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                    
                    <div className="relative p-6 text-white">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-white/20 rounded-lg backdrop-blur">
                          <Calendar className="w-6 h-6" />
                        </div>
                        <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold backdrop-blur">
                          {holiday.category.toUpperCase()}
                        </span>
                      </div>
                      
                      <h3 className="font-bold text-xl mb-2 group-hover:scale-105 transition-transform duration-300">
                        {holiday.holiday}
                      </h3>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-lg font-semibold">{holiday.date}</p>
                          <p className="text-sm opacity-90">{holiday.day}</p>
                        </div>
                        <div className="p-2 bg-white/20 rounded-full backdrop-blur">
                          <Clock className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          )}
        </section>

        {/* Enhanced Vacation Details Section */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
              🏖️ Vacation Schedule
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">Plan your breaks and holidays</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {vacationDetails.map((vacation, index) => {
              const IconComponent = vacation.icon;
              return (
                <AnimatedCard key={index} delay={index * 150}>
                  <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 dark:border-gray-700">
                    <div className={`h-2 bg-gradient-to-r ${vacation.color}`}></div>
                    
                    <div className="p-8">
                      <div className="flex items-center mb-6">
                        <div className={`p-4 bg-gradient-to-r ${vacation.color} rounded-2xl shadow-lg mr-4 group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-2xl text-gray-900 dark:text-white mb-1">
                            {vacation.name}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400">
                            {vacation.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                          <span className="font-semibold text-gray-700 dark:text-gray-300">Duration:</span>
                          <span className="text-gray-900 dark:text-white font-bold">
                            {vacation.start} to {vacation.end}
                          </span>
                        </div>
                        
                        {vacation.reopen && (
                          <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-700">
                            <span className="font-semibold text-green-700 dark:text-green-300">Reopens:</span>
                            <span className="text-green-900 dark:text-green-100 font-bold">
                              {vacation.reopen}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </AnimatedCard>
              );
            })}
          </div>
        </section>

        {/* Footer with School Info */}
        <footer className="text-center py-12 border-t border-gray-200 dark:border-gray-700">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg mb-4">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">School Administration</h3>
            <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400">
              <MapPin className="w-4 h-4" />
              <span>Patna, Bihar, India</span>
            </div>
          </div>
          <p className="text-gray-500 dark:text-gray-400">
            Stay updated with all school notifications and important dates
          </p>
        </footer>
      </div>
    </div>
  );
};

export default NotificationPage;