'use client';
import { useState } from "react";
type Achievement = {
  id: number;
  title: string;
  description: string;
  details:string
};

const achievements = [
  {
    id: 1,
    title: "Best School Award 2024",
    description: "Awarded for excellence in academics and extracurriculars.",
    image: "/images/award1.jpg",
    details: "Our school was recognized as the best in the region due to our dedication to education, innovation, and student growth."
  },
  {
    id: 2,
    title: "National Science Olympiad Champions",
    description: "Won 1st place in the National Science Olympiad.",
    image: "/images/award2.jpg",
    details: "Our students excelled in various scientific disciplines, winning gold medals in Physics, Chemistry, and Biology."
  },
  {
    id: 3,
    title: "State-Level Football Championship Winners",
    description: "Our football team secured the state championship.",
    image: "/images/award3.jpg",
    details: "With teamwork and dedication, our football team emerged victorious in the state-level tournament, showcasing incredible skill and strategy."
  }
];

export default function AchievementsPage() {
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-6 text-center">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">Our Achievements</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-5 flex flex-col items-center"
          >
            <img
              src={achievement.image}
              alt={achievement.title}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{achievement.title}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{achievement.description}</p>
            <button
              onClick={() => achievement && setSelectedAchievement(achievement)}

              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
            >
              Read More
            </button>
          </div>
        ))}
      </div>

      {/* Popup Modal */}
      {selectedAchievement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full text-left">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedAchievement.title}</h2>
            <p className="text-gray-700 dark:text-gray-300 mt-2">{selectedAchievement.details}</p>
            <button
              onClick={() => setSelectedAchievement(null)}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
