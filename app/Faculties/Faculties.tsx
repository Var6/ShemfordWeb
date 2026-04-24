"use client";

import { useState } from "react";
import useSWR from "swr";
import Image from "next/image";
import { GraduationCap, X, Star, Search } from "lucide-react";

type Faculty = {
  _id: string;
  name: string;
  subject: string;
  achievements: string;
  experience: string;
  joinedDate: string;
  bio: string;
  message: string;
  profileUrl: string;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const getExperienceYears = (experience: string): number => {
  const match = experience?.match(/(\d+)/);
  return match ? parseInt(match[1]) : 0;
};

export default function Faculties({ initialFaculties }: { initialFaculties: Faculty[] }) {
  const { data: faculties = [], isLoading } = useSWR<Faculty[]>(
    "/api/faculties",
    fetcher,
    { fallbackData: initialFaculties, revalidateOnFocus: false }
  );

  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);
  const [searchTerm, setSearchTerm]           = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All");

  const subjects: string[] = [
    "All",
    ...Array.from(new Set(faculties.map((f: Faculty) => f.subject))),
  ];

  const filteredFaculties = faculties.filter((faculty: Faculty) => {
    const matchesSearch =
      faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faculty.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === "All" || faculty.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">

      {/* ── Hero ── */}
      <div className="w-full bg-gradient-to-r from-orange-600 to-amber-500 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/15
            rounded-2xl mb-5 border border-white/20">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-100 mb-3">
            Shemford Futuristic School
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Faculty</h1>
          <p className="text-orange-100 text-lg max-w-xl mx-auto">
            Meet our team of {faculties.length} dedicated educators committed to
            nurturing every child's potential.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* ── Search & Filter ── */}
        <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-100
          dark:border-orange-900/30 rounded-2xl p-5 mb-10 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-400" />
            <input
              type="text"
              placeholder="Search by name or subject…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-orange-200 dark:border-orange-800
                rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
            />
          </div>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-4 py-3 border border-orange-200 dark:border-orange-800 rounded-xl
              bg-white dark:bg-gray-900 text-gray-900 dark:text-white
              focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
          >
            {subjects.map((subject: string) => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>

        {/* ── Faculty Grid ── */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-orange-50 dark:bg-orange-900/10 animate-pulse rounded-2xl h-64" />
            ))}
          </div>
        ) : filteredFaculties.length === 0 ? (
          <div className="text-center py-20 bg-orange-50 dark:bg-orange-900/10 rounded-2xl
            border border-orange-100 dark:border-orange-900/30">
            <GraduationCap className="mx-auto w-12 h-12 text-orange-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No faculty found</h3>
            <p className="text-gray-500">Try a different name or subject.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFaculties.map((faculty: Faculty) => {
              const experienceYears = getExperienceYears(faculty.experience);
              return (
                <div
                  key={faculty._id}
                  onClick={() => setSelectedFaculty(faculty)}
                  className="group bg-white dark:bg-gray-900 border-2 border-orange-100
                    dark:border-orange-900/30 rounded-2xl shadow-sm hover:shadow-xl
                    hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  <div className="p-6 flex flex-col items-center text-center gap-3">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-orange-100 dark:ring-orange-900/40">
                      {faculty.profileUrl ? (
                        <Image src={faculty.profileUrl} alt={faculty.name} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
                          <GraduationCap className="w-10 h-10 text-orange-400" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-orange-600
                        transition-colors leading-tight">{faculty.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{faculty.subject}</p>
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wide px-3 py-1 rounded-full
                      bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300
                      border border-orange-200 dark:border-orange-800">
                      {faculty.subject}
                    </span>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(5, Math.max(1, Math.ceil(experienceYears / 6))) }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-current" />
                      ))}
                      <span className="text-xs text-gray-500 ml-1">{experienceYears} yrs</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Modal ── */}
      {selectedFaculty && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full
            max-h-[90vh] overflow-hidden border border-orange-100 dark:border-orange-900/40">

            {/* Header bar */}
            <div className="bg-gradient-to-r from-orange-600 to-amber-500 p-6 flex items-center gap-5">
              <div className="relative w-20 h-20 rounded-full overflow-hidden ring-4 ring-white/30 flex-shrink-0">
                {selectedFaculty.profileUrl ? (
                  <Image src={selectedFaculty.profileUrl} alt={selectedFaculty.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-white/20 flex items-center justify-center">
                    <GraduationCap className="w-10 h-10 text-white" />
                  </div>
                )}
              </div>
              <div className="text-white flex-1 min-w-0">
                <h2 className="text-xl font-bold leading-tight">{selectedFaculty.name}</h2>
                <p className="text-orange-100 text-sm mt-0.5">{selectedFaculty.subject}</p>
              </div>
              <button
                onClick={() => setSelectedFaculty(null)}
                className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors flex-shrink-0"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-9rem)] space-y-4">
              {selectedFaculty.bio && (
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{selectedFaculty.bio}</p>
              )}
              {selectedFaculty.message && (
                <blockquote className="border-l-4 border-orange-400 pl-4 italic text-gray-600
                  dark:text-gray-400 text-sm">
                  "{selectedFaculty.message}"
                </blockquote>
              )}
              {selectedFaculty.experience && (
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Star className="w-4 h-4 text-amber-400" />
                  <span>Experience: {selectedFaculty.experience}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
