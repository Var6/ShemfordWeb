'use client';

import { useEffect, useState } from "react";
import { Trophy, Award, Star, Sparkles, X, AlertCircle } from "lucide-react";
import Image from "next/image";

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
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

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

                  <div className="w-full h-48 rounded-2xl flex items-center justify-center shadow-inner overflow-hidden bg-gray-100 dark:bg-gray-700">
                    {imageErrors.has(achievement._id) ? (
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <AlertCircle className="w-12 h-12 mb-2" />
                        <span className="text-sm">Image not available</span>
                      </div>
                    ) : (
                      <img 
                        src={achievement.image} 
                        alt={achievement.title} 
                        className="object-cover w-full h-full rounded-2xl"
                        onError={() => {
                          setImageErrors(prev => new Set(prev).add(achievement._id));
                        }}
                      />
                    )}
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
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setSelectedAchievement(null)}
                className="sticky top-6 right-6 absolute p-2 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 rounded-full transition z-10"
              >
                <X className="w-5 h-5 text-red-600 dark:text-red-400" />
              </button>
              
              <div className="p-8 pt-12">
                {/* Modal Image */}
                <div className="w-full h-64 rounded-2xl overflow-hidden mb-6 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  {imageErrors.has(selectedAchievement._id) ? (
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <AlertCircle className="w-16 h-16 mb-2" />
                      <span>Image not available</span>
                    </div>
                  ) : (
                    <img
                      src={selectedAchievement.image}
                      alt={selectedAchievement.title}
                      className="w-full h-full object-cover rounded-2xl"
                      onError={() => {
                        setImageErrors(prev => new Set(prev).add(selectedAchievement._id));
                      }}
                    />
                  )}
                </div>

                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {selectedAchievement.title}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 font-semibold text-lg">
                    {selectedAchievement.description}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base">
                    {selectedAchievement.details}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
