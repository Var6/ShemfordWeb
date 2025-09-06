'use client';

import { useEffect, useState } from "react";
import { Trophy, Award, Star, Sparkles, X } from "lucide-react";

type Achievement = {
  _id: string;
  title: string;
  description: string;
  details: string;
  image: string;
  icon: string; // stored in DB as string
  gradient: string;
  color: string;
};

// map icon string to actual component
const icons: Record<string, any> = {
  Trophy,
  Award,
  Star,
  Sparkles,
};

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/achievements")
      .then((res) => res.json())
      .then(setAchievements);
  }, []);

  return (
    <div className="min-h-screen py-16 px-6">
      <div className="relative z-10">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 rounded-full shadow">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Excellence & Recognition</span>
          </div>
          <h1 className="text-5xl font-bold">Our Achievements</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {achievements.map((achievement) => {
            const IconComponent = icons[achievement.icon] || Trophy; // fallback
            const isHovered = hoveredCard === achievement._id;

            return (
              <div
                key={achievement._id}
                className={`group relative rounded-3xl shadow-xl transition-all duration-500 hover:scale-105 ${isHovered ? 'transform scale-105' : ''}`}
                onMouseEnter={() => setHoveredCard(achievement._id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${achievement.gradient} opacity-0 group-hover:opacity-10 transition`} />
                
                <div className="relative p-8 flex flex-col items-center text-center space-y-6">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${achievement.gradient} shadow-lg`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  <div className="w-full h-48 rounded-2xl flex items-center justify-center shadow-inner overflow-hidden">
                    <img src={achievement.image} alt={achievement.title} className="object-cover w-full h-full rounded-2xl" />
                  </div>

                  <div className="space-y-3">
                    <h2 className="text-2xl font-bold">{achievement.title}</h2>
                    <p className="text-gray-600">{achievement.description}</p>
                  </div>

                  <button
                    onClick={() => setSelectedAchievement(achievement)}
                    className={`px-8 py-3 bg-gradient-to-r ${achievement.gradient} text-white font-semibold rounded-xl shadow-lg`}
                  >
                    Read More
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {selectedAchievement && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-6 z-50">
            <div className="relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl max-w-2xl w-full">
              <button
                onClick={() => setSelectedAchievement(null)}
                className="absolute top-6 right-6 p-2 bg-gray-200 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">{selectedAchievement.title}</h2>
                <p>{selectedAchievement.details}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
