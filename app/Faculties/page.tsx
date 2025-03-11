"use client";

import { useState } from "react";

type Faculty = {
  id: number;
  name: string;
  qualifications: string;
  achievements: string;
  experience: string;
  joined: string;
  image: string;
};

const faculties: Faculty[] = Array.from({ length: 35 }, (_, i) => ({
  id: i + 1,
  name: `Professor ${i + 1}`,
  qualifications: "PhD in Subject",
  achievements: "Published 10+ research papers",
  experience: `${5 + i % 10} years`,
  joined: `20${10 + (i % 15)}`,
  image: `https://via.placeholder.com/150?text=Faculty+${i + 1}`,
}));

export default function Faculties() {
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
        Our Faculties
      </h1>

      {/* Faculty Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {faculties.map((faculty) => (
          <div
            key={faculty.id}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md text-center cursor-pointer hover:shadow-lg transition"
            onClick={() => setSelectedFaculty(faculty)}
          >
            <img
              src={faculty.image}
              alt={faculty.name}
              className="w-32 h-32 mx-auto rounded-full mb-3"
            />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {faculty.name}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">{faculty.qualifications}</p>
          </div>
        ))}
      </div>

      {/* Faculty Popup */}
      {selectedFaculty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-600 dark:text-gray-300 text-xl"
              onClick={() => setSelectedFaculty(null)}
            >
              &times;
            </button>
            <img
              src={selectedFaculty.image}
              alt={selectedFaculty.name}
              className="w-32 h-32 mx-auto rounded-full mb-3"
            />
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
              {selectedFaculty.name}
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300">{selectedFaculty.qualifications}</p>

            <div className="mt-4 text-gray-700 dark:text-gray-200 space-y-2">
              <p><strong>Achievements:</strong> {selectedFaculty.achievements}</p>
              <p><strong>Experience:</strong> {selectedFaculty.experience}</p>
              <p><strong>Joined:</strong> {selectedFaculty.joined}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
