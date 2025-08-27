'use client';
import React, { useState } from 'react';
import { 
  GraduationCap, 
  Monitor, 
  Microscope, 
  Music, 
  Palette, 
  Users, 
  Wifi, 
  Shield, 
  Heart, 
  Book, 
  Coffee,
  Zap,
  MapPin,
  ChevronRight,
  Eye,
  X
} from 'lucide-react';

const CampusPage = () => {
  const [selectedFacility, setSelectedFacility] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const facilities = [
    {
      id: 1,
      title: 'IT-Enabled Classrooms',
      description: 'Well-equipped classrooms with multimedia projectors and modern teaching aids',
      icon: Monitor,
      category: 'academic',
      image: 'bg-gradient-to-br from-blue-500 to-indigo-600',
      features: ['Multimedia projectors', 'Interactive whiteboards', 'Air-conditioned environment', 'Modern furniture']
    },
    {
      id: 2,
      title: 'State-of-the-art Laboratories',
      description: 'Fully equipped Computer, Physics, Chemistry, Biology, and Mathematics labs',
      icon: Microscope,
      category: 'academic',
      image: 'bg-gradient-to-br from-purple-500 to-pink-600',
      features: ['Computer Lab', 'Physics Lab', 'Chemistry Lab', 'Biology Lab', 'Mathematics Lab']
    },
    {
      id: 3,
      title: 'Performing Arts Centre',
      description: 'Modern facility for music, dance, drama, and cultural activities',
      icon: Music,
      category: 'arts',
      image: 'bg-gradient-to-br from-pink-500 to-rose-600',
      features: ['Western Music room', 'Indian Music room', 'Dance studio', 'Drama hall', 'Audio equipment']
    },
    {
      id: 4,
      title: 'Art & Creative Studios',
      description: 'Dedicated spaces for artistic expression and creativity',
      icon: Palette,
      category: 'arts',
      image: 'bg-gradient-to-br from-orange-500 to-red-600',
      features: ['Art studio', 'Craft room', 'Pottery wheel', 'Exhibition space', 'Storage facilities']
    },
    {
      id: 5,
      title: 'Sports Complex',
      description: 'Comprehensive sporting facilities for various indoor and outdoor games',
      icon: Users,
      category: 'sports',
      image: 'bg-gradient-to-br from-green-500 to-teal-600',
      features: ['Basketball court', 'Tennis court', 'Badminton hall', 'Cricket ground', 'Football field', 'Table tennis', 'Judo hall']
    },
    {
      id: 6,
      title: 'Learning Centre & Library',
      description: 'Modern library with extensive collection and digital resources',
      icon: Book,
      category: 'academic',
      image: 'bg-gradient-to-br from-indigo-500 to-blue-600',
      features: ['38,200 books', '40 journals & magazines', '1600 multimedia resources', '16 online databases', 'Reading areas']
    },
    {
      id: 7,
      title: 'Medical Centre',
      description: 'On-campus healthcare facility with qualified medical staff',
      icon: Heart,
      category: 'wellness',
      image: 'bg-gradient-to-br from-red-500 to-pink-600',
      features: ['Qualified nurses', 'Doctor consultation', 'First aid facilities', 'Health monitoring', 'Emergency care']
    },
    {
      id: 8,
      title: 'Modern Cafeteria',
      description: 'Ultra-modern kitchen and dining facilities with nutritious meals',
      icon: Coffee,
      category: 'dining',
      image: 'bg-gradient-to-br from-yellow-500 to-orange-600',
      features: ['Ultra-modern kitchen', 'Two dining halls', 'Nutritious meals', 'Hygienic preparation', 'Varied menu']
    },
    {
      id: 9,
      title: 'Wi-Fi Campus',
      description: 'Fully connected campus with high-speed internet access',
      icon: Wifi,
      category: 'technology',
      image: 'bg-gradient-to-br from-cyan-500 to-blue-600',
      features: ['Campus-wide Wi-Fi', 'High-speed internet', 'Digital learning tools', 'Online resources', '24/7 connectivity']
    },
    {
      id: 10,
      title: 'Security & Safety',
      description: 'Modern security systems ensuring a safe learning environment',
      icon: Shield,
      category: 'safety',
      image: 'bg-gradient-to-br from-gray-500 to-slate-600',
      features: ['CCTV surveillance', 'Security personnel', 'Access control', 'Emergency protocols', 'Safe transportation']
    },
    {
      id: 11,
      title: 'Sustainability Initiatives',
      description: 'Environmental conservation and energy-efficient infrastructure',
      icon: Zap,
      category: 'sustainability',
      image: 'bg-gradient-to-br from-emerald-500 to-green-600',
      features: ['LED lighting', 'Solar water heaters', 'Water conservation', 'Waste management', 'Energy efficiency']
    },
    {
      id: 12,
      title: 'Multipurpose Auditorium',
      description: 'Large venue for assemblies, performances, and events',
      icon: Users,
      category: 'events',
      image: 'bg-gradient-to-br from-violet-500 to-purple-600',
      features: ['Large seating capacity', 'Audio-visual equipment', 'Stage facilities', 'Air conditioning', 'Acoustic design']
    }
  ];

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

  const filteredFacilities = activeCategory === 'all' 
    ? facilities 
    : facilities.filter(facility => facility.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-br from-blue-600 to-purple-700 overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-purple-900/50"></div>
        
        {/* Hero Content */}
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
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white bg-opacity-10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-300 bg-opacity-20 rounded-full blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Overview Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Academic Excellence Through Infrastructure
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Our unique open school design promotes collaborative learning while state-of-the-art facilities 
            ensure students have access to the best resources for their educational journey.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
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
            const IconComponent = facility.icon;
            return (
              <div
                key={facility.id}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 overflow-hidden cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedFacility(facility)}
              >
                {/* Card Header */}
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

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {facility.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                    {facility.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                      {facility.category}
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-2">Campus by Numbers</h3>
            <p className="text-blue-100">Impressive statistics about our infrastructure</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">38,200</div>
              <div className="text-blue-100">Books in Library</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">1,600</div>
              <div className="text-blue-100">Multimedia Resources</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">40+</div>
              <div className="text-blue-100">Journals & Magazines</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">16</div>
              <div className="text-blue-100">Online Databases</div>
            </div>
          </div>
        </div>

        {/* Facility Detail Modal */}
        {selectedFacility && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className={`${selectedFacility.image} h-48 relative rounded-t-2xl`}>
                <div className="absolute inset-0 bg-black bg-opacity-40 rounded-t-2xl"></div>
                <button
                  onClick={() => setSelectedFacility(null)}
                  className="absolute top-4 right-4 p-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full hover:bg-opacity-30 transition-all"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
                
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center mr-3">
                      <selectedFacility.icon className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-sm font-medium border border-white border-opacity-30">
                      {selectedFacility.category}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold">{selectedFacility.title}</h2>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
                  {selectedFacility.description}
                </p>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Key Features</h3>
                <div className="grid gap-3">
                  {selectedFacility.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
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