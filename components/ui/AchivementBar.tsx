'use client';
import React, { useState, useEffect } from 'react';

interface AnimatedNumberProps {
  value: string;
  duration: number; // Duration in ms for the animation
  prefix?: string;
  postfix?: string;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  duration,
  prefix = '',
  postfix = '',
}) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const targetValue = parseInt(value.replace(',', ''));

  useEffect(() => {
    const startValue = 0;
    const startTime = Date.now();

    const updateValue = () => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      setAnimatedValue(
        Math.floor(startValue + progress * (targetValue - startValue)),
      );

      if (progress < 1) {
        requestAnimationFrame(updateValue); // Keep updating until the animation completes
      }
    };

    requestAnimationFrame(updateValue);
  }, [value, duration, targetValue]);

  return (
    <span className="text-4xl font-bold">
      {prefix}
      {animatedValue.toLocaleString()} {/* Adding comma to the number */}
      {postfix}
    </span>
  );
};

interface Achievement {
  id: number;
  metric: string;
  value: string;
  prefix?: string;
  postfix?: string;
}

const achievementsList: Achievement[] = [
  {
    id: 0,
    metric: 'Years of Experience',
    value: '15',
    postfix: '+',
  },
  {
    id: 1,
    metric: 'Global Students',
    value: '10',
    postfix: '+',
  },
  {
    id: 2,
    metric: 'Student Nationalities',
    value: '5',
    postfix: '+',
  },
];

const AchievementsSection: React.FC = () => {
  return (
    <div className="xl:gap-6 sm:py-16 xl:px-16">
      <div className="flex flex-col sm:flex-row items-center justify-between">
        {achievementsList.map((achievement) => (
          <div
            key={achievement.id}
            className="flex flex-col items-center justify-center mx-4 my-4 sm:my-0"
          >
            <h2 className="text-orange-400 dark:text-orange-500 text-4xl font-bold flex flex-row">
              {achievement.prefix ? achievement.prefix : ''}
              <AnimatedNumber
                value={achievement.value}
                duration={1500} // Duration of animation in milliseconds
                postfix={achievement.postfix}
              />
            </h2>
            <p className="text-[#ADB7BE] text-base">{achievement.metric}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsSection;
