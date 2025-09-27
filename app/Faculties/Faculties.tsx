"use client";

import { useState } from "react";
import useSWR from "swr";
import Image from "next/image";
import { GraduationCap, X, Star } from "lucide-react";

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

export default function Faculties({ initialFaculties }: { initialFaculties: Faculty[] }) {
  const { data: faculties = [], isLoading } = useSWR<Faculty[]>(
    "/api/faculties",
    fetcher,
    {
      fallbackData: initialFaculties,
      revalidateOnFocus: false,
    }
  );

  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All");

  const subjects: string[] = [
    "All",
    ...Array.from(new Set(faculties.map((f: Faculty) => f.subject))),
  ];

  const filteredFaculties = faculties.filter((faculty: Faculty) => {
    const matchesSearch =
      faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faculty.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject =
      selectedSubject === "All" || faculty.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const getSubjectColor = (subject: string) => {
    const colors: { [key: string]: string } = {
      English: "from-blue-500 to-cyan-600",
      "Social Science": "from-purple-500 to-indigo-600",
      Mathematics: "from-green-500 to-emerald-600",
      Science: "from-orange-500 to-red-600",
      Physics: "from-teal-500 to-green-600",
      Hindi: "from-pink-500 to-rose-600",
      Computer: "from-indigo-500 to-blue-600",
      Sanskrit: "from-amber-500 to-yellow-600",
      EVS: "from-emerald-500 to-teal-600",
      "Pre Primary": "from-rose-500 to-pink-600",
      Sports: "from-red-500 to-orange-600",
    };
    for (const [key, color] of Object.entries(colors)) {
      if (subject.toLowerCase().includes(key.toLowerCase())) {
        return color;
      }
    }
    return "from-gray-500 to-slate-600";
  };

  const getExperienceYears = (experience: string): number => {
    const match = experience?.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  return (
    <div className="min-h-screen py-16 px-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold">Our Faculties</h1>
        <p className="text-lg text-gray-600">
          Meet our team of {faculties.length} dedicated educators
        </p>
      </div>

      {/* Search & Filter */}
      <div className="max-w-4xl mx-auto mb-12 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search faculty by name or subject..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-xl"
        />
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="px-6 py-2 border rounded-xl"
        >
          {subjects.map((subject: string) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>

      {/* Faculty Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-gray-200 animate-pulse rounded-3xl h-64"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {filteredFaculties.map((faculty: Faculty) => {
            const subjectGradient = getSubjectColor(faculty.subject);
            const experienceYears = getExperienceYears(faculty.experience);

            return (
              <div
                key={faculty._id}
                className="group relative bg-white rounded-3xl shadow-xl border overflow-hidden cursor-pointer transition-all hover:scale-105"
                onClick={() => setSelectedFaculty(faculty)}
              >
                <div className="relative p-6 flex flex-col items-center text-center space-y-4">
                  {/* Profile */}
                  <div className="relative w-24 h-24 rounded-full overflow-hidden">
                    {faculty.profileUrl ? (
                      <Image
                        src={faculty.profileUrl}
                        alt={faculty.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <GraduationCap className="w-12 h-12 text-gray-500 mx-auto" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold">{faculty.name}</h3>
                  <p className="text-sm text-gray-600">{faculty.subject}</p>
                  <div
                    className={`inline-flex px-3 py-1 bg-gradient-to-r ${subjectGradient} text-white text-xs font-semibold rounded-full`}
                  >
                    {faculty.subject}
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({
                      length: Math.min(
                        5,
                        Math.max(1, Math.ceil(experienceYears / 6))
                      ),
                    }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-500 fill-current"
                      />
                    ))}
                    <span className="text-sm">{experienceYears}yrs</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {selectedFaculty && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-6 z-50">
          <div className="relative bg-white p-8 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedFaculty(null)}
              className="absolute top-6 right-6 p-2 bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            <div className="text-center space-y-4">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden relative">
                {selectedFaculty.profileUrl ? (
                  <Image
                    src={selectedFaculty.profileUrl}
                    alt={selectedFaculty.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <GraduationCap className="w-16 h-16 text-gray-500 mx-auto" />
                )}
              </div>
              <h2 className="text-3xl font-bold">{selectedFaculty.name}</h2>
              <p className="text-lg">{selectedFaculty.subject}</p>
              <p className="text-gray-700">{selectedFaculty.bio}</p>
              <p className="italic">"{selectedFaculty.message}"</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
