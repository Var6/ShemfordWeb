'use client';
import React, { useEffect, useState } from 'react';
import { 
  GraduationCap, Monitor, Microscope, Music, Palette, Users, Wifi, Shield, Heart, Book, Coffee, Zap, MapPin, ChevronRight, Eye, X 
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
  { id: 'all', name: 'All Facilities', icon: MapPin },
  { id: 'academic', name: 'Academic', icon: GraduationCap },
  { id: 'arts', name: 'Arts', icon: Palette },
  { id: 'sports', name: 'Sports', icon: Users },
  { id: 'wellness', name: 'Wellness', icon: Heart },
  { id: 'technology', name: 'Technology', icon: Monitor },
  { id: 'dining', name: 'Dining', icon: Coffee },
  { id: 'safety', name: 'Safety', icon: Shield },
  { id: 'sustainability', name: 'Sustainability', icon: Zap },
  { id: 'events', name: 'Events', icon: Users }
];

const CampusPage = () => {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);

  useEffect(() => {
    fetch('/api/facilities')
      .then(res => res.json())
      .then(data => setFacilities(data))
      .catch(err => console.error('Error fetching facilities:', err));
  }, []);

  const filteredFacilities = activeCategory === 'all'
    ? facilities
    : facilities.filter(f => f.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-br from-blue-600 to-purple-700 overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-purple-900/50"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-center text-white">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 backdrop-blur-sm rounded-full mb-6">
              <GraduationCap className="w-10 h-10" />
            </div>
            <h1 className="text-5xl font-bold mb-4">Our Campus</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Discover world-class facilities designed to nurture learning, creativity, and holistic development
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(category => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Facilities Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredFacilities.map((facility, index) => {
            const IconComponent = iconMap[facility.icon] || MapPin;
            return (
              <div
                key={facility._id}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden cursor-pointer"
                onClick={() => setSelectedFacility(facility)}
              >
                <div className={`${facility.image} h-32 relative`}>
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  <div className="absolute top-4 left-4">
                    <div className="w-10 h-10 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <button className="p-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full hover:bg-opacity-30 transition-all">
                      <Eye className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{facility.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{facility.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">{facility.category}</span>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Facility Detail Modal */}
        {selectedFacility && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className={`${selectedFacility.image} h-48 relative rounded-t-2xl`}>
                <div className="absolute inset-0 bg-black bg-opacity-40 rounded-t-2xl"></div>
                <button
                  onClick={() => setSelectedFacility(null)}
                  className="absolute top-4 right-4 p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                      {React.createElement(iconMap[selectedFacility.icon] || MapPin, { className: 'w-6 h-6' })}
                    </div>
                    <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-medium border border-white border-opacity-30">
                      {selectedFacility.category}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold">{selectedFacility.title}</h2>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-700 text-lg leading-relaxed mb-6">{selectedFacility.description}</p>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Features</h3>
                <div className="grid gap-3">
                  {selectedFacility.features.map((feature, i) => (
                    <div key={i} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setSelectedFacility(null)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                  >
                    Close Details
                  </button>
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
