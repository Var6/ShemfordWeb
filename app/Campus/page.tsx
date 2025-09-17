'use client';
import React, { useEffect, useState } from 'react';
import { 
  GraduationCap, Monitor, Microscope, Music, Palette, Users, Wifi, Shield, Heart, Book, Coffee, Zap, MapPin, ChevronRight, Eye, X, Star, Award, Clock, ArrowRight
} from 'lucide-react';

interface Facility {
  _id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  icon: string;
  features: string[];
}

const iconMap: { [key: string]: any } = {
  GraduationCap, Monitor, Microscope, Music, Palette, Users, Wifi, Shield, Heart, Book, Coffee, Zap
};

const categories = [
  { id: 'all', name: 'All Facilities', icon: MapPin, gradient: 'from-blue-500 to-purple-600', count: 0 },
  { id: 'academic', name: 'Academic', icon: GraduationCap, gradient: 'from-blue-500 to-indigo-600', count: 0 },
  { id: 'arts', name: 'Arts & Culture', icon: Palette, gradient: 'from-purple-500 to-pink-600', count: 0 },
  { id: 'sports', name: 'Sports & Recreation', icon: Users, gradient: 'from-green-500 to-emerald-600', count: 0 },
  { id: 'wellness', name: 'Health & Wellness', icon: Heart, gradient: 'from-red-500 to-rose-600', count: 0 },
  { id: 'technology', name: 'Technology', icon: Monitor, gradient: 'from-gray-500 to-slate-600', count: 0 },
  { id: 'dining', name: 'Dining', icon: Coffee, gradient: 'from-orange-500 to-amber-600', count: 0 },
  { id: 'safety', name: 'Safety & Security', icon: Shield, gradient: 'from-indigo-500 to-blue-600', count: 0 },
  { id: 'sustainability', name: 'Sustainability', icon: Zap, gradient: 'from-green-400 to-teal-600', count: 0 },
  { id: 'events', name: 'Events & Venues', icon: Star, gradient: 'from-yellow-500 to-orange-600', count: 0 }
];

const CampusPage = () => {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchFacilities();
  }, []);

  const fetchFacilities = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/facilities');
      const data = await res.json();
      setFacilities(data);
      
      // Update category counts
      categories.forEach(cat => {
        if (cat.id === 'all') {
          cat.count = data.length;
        } else {
          cat.count = data.filter((f: Facility) => f.category === cat.id).length;
        }
      });
    } catch (err) {
      console.error('Error fetching facilities:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredFacilities = facilities.filter(facility => {
    const matchesCategory = activeCategory === 'all' || facility.category === activeCategory;
    const matchesSearch = facility.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         facility.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryInfo = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId) || categories[0];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative h-[70vh] overflow-hidden">
        {/* Background with parallax effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800">
          <div className="absolute inset-0 bg-black/30" />
         <div
  className={`absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] opacity-40`}
/>

        </div>
        
        {/* Hero Content */}
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white/10 backdrop-blur-md rounded-2xl mb-8 border border-white/20">
              <GraduationCap className="w-12 h-12 text-white" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Our Campus
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed max-w-3xl mx-auto">
              Discover world-class facilities designed to nurture learning, creativity, and holistic development in an inspiring environment
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="flex items-center space-x-2 text-blue-200">
                <Award className="w-5 h-5" />
                <span className="font-medium">Award-Winning Infrastructure</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-200">
                <Clock className="w-5 h-5" />
                <span className="font-medium">24/7 Access</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-200">
                <Star className="w-5 h-5" />
                <span className="font-medium">Premium Facilities</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 -mt-16 relative z-10">
        {/* Search and Stats Bar */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6 mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search facilities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-12 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-8 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{facilities.length}</div>
                <div className="text-gray-600">Total Facilities</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{categories.filter(c => c.count > 0 && c.id !== 'all').length}</div>
                <div className="text-gray-600">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{filteredFacilities.length}</div>
                <div className="text-gray-600">Showing</div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Explore by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map(category => {
              const IconComponent = category.icon;
              const isActive = activeCategory === category.id;
              
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 transform hover:scale-105 ${
                    isActive
                      ? 'shadow-2xl ring-2 ring-blue-500'
                      : 'shadow-lg hover:shadow-2xl'
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} ${
                    isActive ? 'opacity-100' : 'opacity-80 group-hover:opacity-90'
                  } transition-opacity`} />
                  
                  <div className="relative text-white">
                    <div className="flex items-center justify-center mb-3">
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <h3 className="font-semibold text-sm text-center mb-2 leading-tight">{category.name}</h3>
                    <div className="text-xs opacity-90 text-center">
                      {category.count} {category.count === 1 ? 'facility' : 'facilities'}
                    </div>
                  </div>
                  
                  {isActive && (
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Facilities Grid */}
        {loading ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white/60 rounded-2xl p-6 animate-pulse">
                <div className="bg-gray-300 h-32 rounded-xl mb-4" />
                <div className="bg-gray-300 h-4 rounded mb-2" />
                <div className="bg-gray-300 h-3 rounded mb-4" />
                <div className="space-y-2">
                  <div className="bg-gray-300 h-3 rounded w-3/4" />
                  <div className="bg-gray-300 h-3 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredFacilities.length === 0 ? (
          <div className="text-center py-20 bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20">
            <MapPin className="mx-auto h-16 w-16 text-gray-400 mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No facilities found</h3>
            <p className="text-gray-600">
              {searchTerm 
                ? `No facilities match "${searchTerm}". Try adjusting your search.`
                : "No facilities available in this category."
              }
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredFacilities.map((facility, index) => {
              const IconComponent = iconMap[facility.icon] || MapPin;
              const categoryInfo = getCategoryInfo(facility.category);
              
              return (
                <div
                  key={facility._id}
                  className="group bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 cursor-pointer overflow-hidden"
                  onClick={() => setSelectedFacility(facility)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Image/Banner */}
                  <div className="relative h-48 overflow-hidden">
                    {facility.image && facility.image.startsWith('http') ? (
                      <img 
                        src={facility.image} 
                        alt={facility.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${categoryInfo.gradient} transition-transform duration-700 group-hover:scale-110`} />
                    )}
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                      <div className="bg-white/20 backdrop-blur-md rounded-full px-3 py-1 border border-white/30">
                        <span className="text-white text-xs font-medium">{categoryInfo.name}</span>
                      </div>
                    </div>
                    
                    {/* View button */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                      <button className="bg-white/20 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/30 transition-all duration-200 hover:scale-110">
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Icon overlay */}
                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                        <span className="text-2xl">{facility.icon}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
                        {facility.title}
                      </h3>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 ml-2" />
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
                      {facility.description}
                    </p>

                    {/* Features preview */}
                    {facility.features.length > 0 && (
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-xs text-gray-500 font-medium">
                          <Star className="w-3 h-3" />
                          <span>Key Features</span>
                        </div>
                        <div className="space-y-1">
                          {facility.features.slice(0, 2).map((feature, i) => (
                            <div key={i} className="flex items-center text-xs text-gray-600">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 flex-shrink-0" />
                              <span className="truncate">{feature}</span>
                            </div>
                          ))}
                          {facility.features.length > 2 && (
                            <div className="text-xs text-blue-600 font-medium">
                              +{facility.features.length - 2} more features
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Action area */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">
                          {categoryInfo.name}
                        </span>
                        <div className="flex items-center text-xs text-gray-500">
                          <span>View Details</span>
                          <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Facility Detail Modal */}
        {selectedFacility && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-white/20">
              {/* Modal Header */}
              <div className="relative h-64 overflow-hidden">
                {selectedFacility.image && selectedFacility.image.startsWith('http') ? (
                  <img 
                    src={selectedFacility.image} 
                    alt={selectedFacility.title}
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${getCategoryInfo(selectedFacility.category).gradient}`} />
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                <button
                  onClick={() => setSelectedFacility(null)}
                  className="absolute top-6 right-6 bg-white/10 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/20 transition-all duration-200 hover:scale-110"
                >
                  <X className="w-6 h-6" />
                </button>
                
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mr-4 border border-white/20">
                      <span className="text-3xl">{selectedFacility.icon}</span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                      <span className="text-sm font-medium">{getCategoryInfo(selectedFacility.category).name}</span>
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold mb-2">{selectedFacility.title}</h2>
                </div>
              </div>
              
              {/* Modal Content */}
              <div className="p-8 overflow-y-auto max-h-[calc(90vh-16rem)]">
                <div className="prose prose-gray max-w-none">
                  <p className="text-lg text-gray-700 leading-relaxed mb-8">
                    {selectedFacility.description}
                  </p>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <Star className="w-6 h-6 mr-3 text-blue-600" />
                    Key Features & Amenities
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-8">
                    {selectedFacility.features.map((feature, i) => (
                      <div key={i} className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mr-4 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xl font-bold mb-2">Ready to Visit?</h4>
                        <p className="text-blue-100">Contact us to schedule a tour of this facility</p>
                      </div>
                      <button 
                        onClick={() => setSelectedFacility(null)}
                        className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-all duration-200 hover:scale-105"
                      >
                        Get in Touch
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CampusPage;