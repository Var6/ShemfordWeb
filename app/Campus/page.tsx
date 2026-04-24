'use client';
import React, { useEffect, useState } from 'react';
import {
  GraduationCap, Monitor, Microscope, Music, Palette, Users, Wifi, Shield,
  Heart, Book, Coffee, Zap, MapPin, ChevronRight, Eye, X, Star, Award, Clock, ArrowRight
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
  { id: 'all',            name: 'All Facilities',    icon: MapPin,        count: 0 },
  { id: 'academic',       name: 'Academic',           icon: GraduationCap, count: 0 },
  { id: 'arts',           name: 'Arts & Culture',     icon: Palette,       count: 0 },
  { id: 'sports',         name: 'Sports',             icon: Users,         count: 0 },
  { id: 'wellness',       name: 'Health & Wellness',  icon: Heart,         count: 0 },
  { id: 'technology',     name: 'Technology',         icon: Monitor,       count: 0 },
  { id: 'dining',         name: 'Dining',             icon: Coffee,        count: 0 },
  { id: 'safety',         name: 'Safety & Security',  icon: Shield,        count: 0 },
  { id: 'sustainability', name: 'Sustainability',      icon: Zap,           count: 0 },
  { id: 'events',         name: 'Events & Venues',    icon: Star,          count: 0 },
];

const CampusPage = () => {
  const [facilities, setFacilities]           = useState<Facility[]>([]);
  const [activeCategory, setActiveCategory]   = useState('all');
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [loading, setLoading]                 = useState(true);
  const [searchTerm, setSearchTerm]           = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res  = await fetch('/api/facilities');
        const data = await res.json();
        setFacilities(data);
        categories.forEach(cat => {
          cat.count = cat.id === 'all' ? data.length : data.filter((f: Facility) => f.category === cat.id).length;
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filteredFacilities = facilities.filter(f => {
    const matchCat    = activeCategory === 'all' || f.category === activeCategory;
    const matchSearch = f.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        f.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  const getCat = (id: string) => categories.find(c => c.id === id) || categories[0];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">

      {/* ── Hero ── */}
      <div className="w-full bg-gradient-to-r from-orange-600 to-amber-500 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/15
            backdrop-blur-md rounded-2xl mb-6 border border-white/20">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-100 mb-3">
            Shemford Futuristic School
          </p>
          <h1 className="text-5xl md:text-6xl font-bold mb-5 leading-tight">Our Campus</h1>
          <p className="text-lg text-orange-100 max-w-2xl mx-auto leading-relaxed">
            World-class facilities designed to nurture learning, creativity, and holistic
            development in an inspiring environment.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-orange-100">
            <span className="flex items-center gap-2"><Award className="w-4 h-4" /> Modern Infrastructure</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> All-Day Access</span>
            <span className="flex items-center gap-2"><Star className="w-4 h-4" /> Premium Facilities</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        {/* ── Search + stats ── */}
        <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30
          rounded-2xl p-6 mb-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="relative flex-1 max-w-md">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-400" />
            <input
              type="text"
              placeholder="Search facilities…"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white dark:bg-gray-900 border border-orange-200
                dark:border-orange-800 rounded-xl text-gray-900 dark:text-white
                placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
            />
          </div>
          <div className="flex gap-8 text-sm divide-x divide-orange-200 dark:divide-orange-800">
            {[
              { val: facilities.length,          label: 'Total' },
              { val: filteredFacilities.length,  label: 'Showing' },
            ].map((s, i) => (
              <div key={i} className={`text-center ${i > 0 ? 'pl-8' : ''}`}>
                <p className="text-2xl font-bold text-orange-600">{s.val}</p>
                <p className="text-gray-500 dark:text-gray-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Category filter ── */}
        <div className="mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-600 mb-2">Browse by Category</p>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Explore by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {categories.map(cat => {
              const Icon = cat.icon;
              const active = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex flex-col items-center gap-2 p-5 rounded-2xl border-2 transition-all duration-200
                    ${active
                      ? 'bg-orange-600 border-orange-600 text-white shadow-lg shadow-orange-200'
                      : 'bg-white dark:bg-gray-900 border-orange-100 dark:border-orange-900/40 text-gray-700 dark:text-gray-300 hover:border-orange-300 hover:bg-orange-50 dark:hover:bg-orange-900/10'
                    }`}
                >
                  <Icon className={`w-6 h-6 ${active ? 'text-white' : 'text-orange-500'}`} />
                  <span className="text-xs font-semibold text-center leading-tight">{cat.name}</span>
                  <span className={`text-[10px] ${active ? 'text-orange-100' : 'text-gray-400'}`}>
                    {cat.count} {cat.count === 1 ? 'facility' : 'facilities'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Facilities grid ── */}
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-orange-50 dark:bg-orange-900/10 rounded-2xl overflow-hidden animate-pulse">
                <div className="h-44 bg-orange-100 dark:bg-orange-900/20" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-orange-100 dark:bg-orange-900/20 rounded w-3/4" />
                  <div className="h-3 bg-orange-100 dark:bg-orange-900/20 rounded" />
                  <div className="h-3 bg-orange-100 dark:bg-orange-900/20 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredFacilities.length === 0 ? (
          <div className="text-center py-20 bg-orange-50 dark:bg-orange-900/10 rounded-2xl
            border border-orange-100 dark:border-orange-900/30">
            <MapPin className="mx-auto h-14 w-14 text-orange-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No facilities found</h3>
            <p className="text-gray-500">
              {searchTerm ? `No results for "${searchTerm}".` : 'No facilities in this category.'}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredFacilities.map((facility, index) => {
              const IconComponent = iconMap[facility.icon] || MapPin;
              const cat = getCat(facility.category);
              return (
                <div
                  key={facility._id}
                  onClick={() => setSelectedFacility(facility)}
                  className="group bg-white dark:bg-gray-900 border-2 border-orange-100 dark:border-orange-900/30
                    rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300
                    cursor-pointer overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative h-44 overflow-hidden bg-gradient-to-br from-orange-100 to-amber-100">
                    {facility.image?.startsWith('http') ? (
                      <img src={facility.image} alt={facility.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-orange-200 to-amber-200
                        group-hover:scale-105 transition-transform duration-500" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-3 left-3">
                      <span className="bg-orange-500 text-white text-[10px] font-bold uppercase
                        tracking-wide px-2.5 py-1 rounded-full">
                        {cat.name}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Eye className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-orange-600
                        transition-colors leading-tight">
                        {facility.title}
                      </h3>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-orange-500
                        group-hover:translate-x-1 transition-all flex-shrink-0 ml-1 mt-0.5" />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2 mb-4">
                      {facility.description}
                    </p>
                    {facility.features.length > 0 && (
                      <div className="space-y-1.5">
                        {facility.features.slice(0, 2).map((feat, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                        {facility.features.length > 2 && (
                          <p className="text-xs text-orange-600 font-medium">
                            +{facility.features.length - 2} more
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Modal ── */}
      {selectedFacility && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-3xl w-full
            max-h-[90vh] overflow-hidden border border-orange-100 dark:border-orange-900/40">
            {/* Modal header image */}
            <div className="relative h-56 overflow-hidden bg-gradient-to-br from-orange-200 to-amber-200">
              {selectedFacility.image?.startsWith('http') ? (
                <img src={selectedFacility.image} alt={selectedFacility.title}
                  className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-orange-300 to-amber-300" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <button
                onClick={() => setSelectedFacility(null)}
                className="absolute top-5 right-5 w-9 h-9 bg-white/20 backdrop-blur-md rounded-full
                  flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
              <div className="absolute bottom-5 left-6 text-white">
                <span className="text-xs font-bold uppercase tracking-widest text-orange-200">
                  {getCat(selectedFacility.category).name}
                </span>
                <h2 className="text-2xl font-bold mt-1">{selectedFacility.title}</h2>
              </div>
            </div>

            {/* Modal body */}
            <div className="p-8 overflow-y-auto max-h-[calc(90vh-14rem)]">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                {selectedFacility.description}
              </p>
              {selectedFacility.features.length > 0 && (
                <>
                  <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                    <Star className="w-5 h-5 text-orange-500" /> Key Features
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3 mb-8">
                    {selectedFacility.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-3 bg-orange-50 dark:bg-orange-900/10
                        border border-orange-100 dark:border-orange-900/30 rounded-xl px-4 py-3">
                        <span className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{feat}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
              <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-6 text-white
                flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-lg mb-1">Interested in This Facility?</h4>
                  <p className="text-orange-100 text-sm">Schedule a campus tour today.</p>
                </div>
                <button
                  onClick={() => setSelectedFacility(null)}
                  className="bg-white text-orange-600 font-bold px-6 py-2.5 rounded-xl
                    hover:bg-orange-50 transition-colors text-sm flex-shrink-0"
                >
                  Contact Us →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampusPage;
