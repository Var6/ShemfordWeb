'use client';
import { useState } from "react";
import { Trophy, Award, Star, X, Sparkles } from "lucide-react";

type Achievement = {
  id: number;
  title: string;
  description: string;
  details: string;
  image: string;
  icon: any;
  gradient: string;
  color: string;
};

const achievements = [
  {
    id: 1,
    title: "Best School Award 2024",
    description: "Awarded for excellence in academics and extracurriculars.",
    image: "/images/award1.jpg",
    details: "Our school was recognized as the best in the region due to our dedication to education, innovation, and student growth. This prestigious award reflects our commitment to fostering excellence in every aspect of student development.",
    icon: Trophy,
    gradient: "from-amber-400 via-yellow-500 to-orange-600",
    color: "text-amber-600"
  },
  {
    id: 2,
    title: "National Science Olympiad Champions",
    description: "Won 1st place in the National Science Olympiad.",
    image: "/images/award2.jpg",
    details: "Our students excelled in various scientific disciplines, winning gold medals in Physics, Chemistry, and Biology. This achievement showcases our dedication to STEM education and our students' exceptional analytical abilities.",
    icon: Award,
    gradient: "from-blue-400 via-indigo-500 to-purple-600",
    color: "text-blue-600"
  },
  {
    id: 3,
    title: "State-Level Football Championship Winners",
    description: "Our football team secured the state championship.",
    image: "/images/award3.jpg",
    details: "With teamwork and dedication, our football team emerged victorious in the state-level tournament, showcasing incredible skill and strategy. This victory represents months of training, perseverance, and unwavering team spirit.",
    icon: Star,
    gradient: "from-emerald-400 via-teal-500 to-cyan-600",
    color: "text-emerald-600"
  }
];

export default function AchievementsPage() {
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 py-16 px-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-to-tr from-amber-400/20 to-orange-600/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-emerald-400/10 to-cyan-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border border-white/20 dark:border-gray-700/20 shadow-lg">
            <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Excellence & Recognition</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 dark:from-white dark:via-blue-200 dark:to-indigo-300 bg-clip-text text-transparent leading-tight">
            Our Achievements
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Celebrating milestones that define our commitment to excellence and innovation
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {achievements.map((achievement) => {
            const IconComponent = achievement.icon;
            const isHovered = hoveredCard === achievement.id;
            
            return (
              <div
                key={achievement.id}
                className={`group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/20 overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 ${isHovered ? 'transform scale-105' : ''}`}
                onMouseEnter={() => setHoveredCard(achievement.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${achievement.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                {/* Content */}
                <div className="relative p-8 flex flex-col items-center text-center space-y-6">
                  {/* Icon */}
                  <div className={`relative p-4 rounded-2xl bg-gradient-to-br ${achievement.gradient} shadow-lg transform group-hover:scale-110 transition-all duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                    <div className="absolute inset-0 rounded-2xl bg-white/20 animate-pulse"></div>
                  </div>

                  {/* Image Placeholder */}
                  <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-2xl flex items-center justify-center shadow-inner overflow-hidden group-hover:scale-105 transition-transform duration-300">
                    <div className={`text-6xl ${achievement.color} opacity-20`}>
                      <IconComponent className="w-16 h-16" />
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="space-y-3">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                      {achievement.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>

                  {/* Button */}
                  <button
                    onClick={() => setSelectedAchievement(achievement)}
                    className={`relative px-8 py-3 bg-gradient-to-r ${achievement.gradient} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden group/btn`}
                  >
                    <span className="relative z-10">Read More</span>
                    <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enhanced Modal */}
        {selectedAchievement && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 z-50 animate-in fade-in duration-300">
            <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl max-w-2xl w-full border border-white/20 dark:border-gray-700/20 animate-in zoom-in-95 duration-300">
              {/* Close Button */}
              <button
                onClick={() => setSelectedAchievement(null)}
                className="absolute top-6 right-6 p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors duration-200 group"
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white" />
              </button>

              {/* Modal Content */}
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${selectedAchievement.gradient} shadow-lg`}>
                    <selectedAchievement.icon className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {selectedAchievement.title}
                  </h2>
                </div>

                {/* Details */}
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700/50 dark:to-gray-800/50 p-6 rounded-2xl border border-gray-200/50 dark:border-gray-600/50">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                    {selectedAchievement.details}
                  </p>
                </div>

                {/* Action Button */}
                <div className="flex justify-center pt-4">
                  <button
                    onClick={() => setSelectedAchievement(null)}
                    className="px-8 py-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}