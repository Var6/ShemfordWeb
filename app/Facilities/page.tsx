'use client';
import { useEffect, useState } from 'react';
import {
  GraduationCap, Monitor, Microscope, Music, Palette, Users, Wifi, Shield,
  Heart, Book, Coffee, Zap, MapPin, ChevronRight, Eye, X, Star, Search,
} from 'lucide-react';
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card';

interface Facility {
  _id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  icon: string;
  features: string[];
}

const iconMap: Record<string, any> = {
  GraduationCap, Monitor, Microscope, Music, Palette, Users,
  Wifi, Shield, Heart, Book, Coffee, Zap,
};

const CATEGORIES = [
  { id: 'all',            label: 'All'           },
  { id: 'academic',       label: 'Academic'      },
  { id: 'arts',           label: 'Arts & Culture'},
  { id: 'sports',         label: 'Sports'        },
  { id: 'wellness',       label: 'Health'        },
  { id: 'technology',     label: 'Technology'    },
  { id: 'dining',         label: 'Dining'        },
  { id: 'safety',         label: 'Safety'        },
  { id: 'sustainability', label: 'Eco'           },
  { id: 'events',         label: 'Events'        },
];

export default function FacilitiesPage() {
  const [facilities, setFacilities]             = useState<Facility[]>([]);
  const [activeCategory, setActiveCategory]     = useState('all');
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [loading, setLoading]                   = useState(true);
  const [searchTerm, setSearchTerm]             = useState('');

  useEffect(() => {
    fetch('/api/facilities')
      .then(r => r.json())
      .then(data => setFacilities(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const countFor = (id: string) =>
    id === 'all' ? facilities.length : facilities.filter(f => f.category === id).length;

  const filtered = facilities.filter(f => {
    const matchCat    = activeCategory === 'all' || f.category === activeCategory;
    const matchSearch = !searchTerm ||
      f.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  const getCatLabel = (id: string) =>
    CATEGORIES.find(c => c.id === id)?.label ?? id;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">

      {/* ── Hero ── */}
      <div className="w-full bg-gradient-to-r from-orange-600 to-amber-500 text-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/15
            rounded-2xl mb-5 border border-white/20">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-100 mb-3">
            Shemford Futuristic School
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">Our Facilities</h1>
          <p className="text-orange-100 text-lg max-w-xl mx-auto leading-relaxed">
            Explore the world-class infrastructure and amenities that make
            Shemford an exceptional place to learn and grow.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* ── Search ── */}
        <div className="relative max-w-lg mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-400" />
          <input
            type="text"
            placeholder="Search facilities…"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white dark:bg-gray-900 border-2 border-orange-100
              dark:border-orange-900/40 rounded-xl text-gray-900 dark:text-white
              placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm shadow-sm"
          />
        </div>

        {/* ── Category pills ── */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(cat => {
            const active = activeCategory === cat.id;
            const cnt    = countFor(cat.id);
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold
                  border-2 transition-all duration-200 ${
                  active
                    ? 'bg-orange-600 border-orange-600 text-white shadow-md'
                    : 'bg-white dark:bg-gray-900 border-orange-100 dark:border-orange-900/40 text-gray-700 dark:text-gray-300 hover:border-orange-300 hover:bg-orange-50 dark:hover:bg-orange-900/10'
                }`}
              >
                {cat.label}
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                  active
                    ? 'bg-white/20 text-white'
                    : 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
                }`}>{cnt}</span>
              </button>
            );
          })}
        </div>

        {/* ── Count line ── */}
        {!loading && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Showing <span className="font-semibold text-orange-600">{filtered.length}</span> of{' '}
            <span className="font-semibold">{facilities.length}</span> facilities
          </p>
        )}

        {/* ── Grid ── */}
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden animate-pulse">
                <div className="h-44 bg-orange-100 dark:bg-orange-900/20" />
                <div className="p-5 space-y-3 border-2 border-orange-100 dark:border-orange-900/30 rounded-b-2xl">
                  <div className="h-4 bg-orange-100 dark:bg-orange-900/20 rounded w-3/4" />
                  <div className="h-3 bg-orange-100 dark:bg-orange-900/20 rounded" />
                  <div className="h-3 bg-orange-100 dark:bg-orange-900/20 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 bg-orange-50 dark:bg-orange-900/10 rounded-2xl
            border border-orange-100 dark:border-orange-900/30">
            <MapPin className="mx-auto h-12 w-12 text-orange-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No facilities found</h3>
            <p className="text-gray-500 text-sm">
              {searchTerm ? `No results for "${searchTerm}".` : 'No facilities in this category.'}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map(facility => {
              const IconComp = iconMap[facility.icon] || MapPin;
              return (
                <CardContainer key={facility._id} containerClassName="w-full">
                  <CardBody
                    onClick={() => setSelectedFacility(facility)}
                    className="group bg-white dark:bg-gray-900 border-2 border-orange-100
                      dark:border-orange-900/30 rounded-2xl shadow-sm hover:shadow-xl
                      transition-shadow duration-300 cursor-pointer overflow-hidden w-full"
                  >
                    <CardItem translateZ={20} className="w-full">
                      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-orange-100 to-amber-100">
                        {facility.image?.startsWith('http') ? (
                          <img src={facility.image} alt={facility.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-orange-200 to-amber-200 flex items-center justify-center">
                            <IconComp className="w-16 h-16 text-orange-300" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute top-3 left-3">
                          <span className="bg-orange-500 text-white text-[10px] font-bold uppercase
                            tracking-wide px-2.5 py-1 rounded-full">
                            {getCatLabel(facility.category)}
                          </span>
                        </div>
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <Eye className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      </div>
                    </CardItem>

                    <CardItem translateZ={40} className="w-full p-5">
                      <div className="flex items-start justify-between mb-2 gap-2">
                        <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-orange-600
                          transition-colors leading-snug">
                          {facility.title}
                        </h3>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-orange-500
                          group-hover:translate-x-1 transition-all flex-shrink-0 mt-0.5" />
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2 mb-3">
                        {facility.description}
                      </p>
                      {facility.features?.length > 0 && (
                        <div className="space-y-1.5">
                          {facility.features.slice(0, 2).map((feat, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                              <span className="truncate">{feat}</span>
                            </div>
                          ))}
                          {facility.features.length > 2 && (
                            <p className="text-xs text-orange-600 font-semibold">
                              +{facility.features.length - 2} more
                            </p>
                          )}
                        </div>
                      )}
                    </CardItem>
                  </CardBody>
                </CardContainer>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Modal ── */}
      {selectedFacility && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={e => e.target === e.currentTarget && setSelectedFacility(null)}
        >
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl
            max-h-[90vh] overflow-hidden border border-orange-100 dark:border-orange-900/40">

            <div className="relative h-52 overflow-hidden bg-gradient-to-br from-orange-200 to-amber-200 flex-shrink-0">
              {selectedFacility.image?.startsWith('http') ? (
                <img src={selectedFacility.image} alt={selectedFacility.title}
                  className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-orange-300 to-amber-300" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <button
                onClick={() => setSelectedFacility(null)}
                className="absolute top-4 right-4 w-9 h-9 bg-white/20 backdrop-blur-md rounded-full
                  flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
              <div className="absolute bottom-4 left-5 text-white">
                <span className="text-[10px] font-bold uppercase tracking-widest text-orange-200">
                  {getCatLabel(selectedFacility.category)}
                </span>
                <h2 className="text-xl font-bold mt-0.5 leading-tight">{selectedFacility.title}</h2>
              </div>
            </div>

            <div className="overflow-y-auto p-6 space-y-5" style={{ maxHeight: 'calc(90vh - 13rem)' }}>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                {selectedFacility.description}
              </p>

              {selectedFacility.features?.length > 0 && (
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-3 text-sm">
                    <Star className="w-4 h-4 text-orange-500" /> Key Features
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {selectedFacility.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 bg-orange-50 dark:bg-orange-900/10
                        border border-orange-100 dark:border-orange-900/30 rounded-xl px-3 py-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl p-5 text-white
                flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold mb-0.5">Want to learn more?</h4>
                  <p className="text-orange-100 text-sm">Schedule a campus tour today.</p>
                </div>
                <button
                  onClick={() => setSelectedFacility(null)}
                  className="bg-white text-orange-600 font-bold px-5 py-2 rounded-xl
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
}
