import Image from 'next/image';
import React from 'react';
import { TypewriterEffectSmooth } from '../typewritterEffect';
import AchievementsSection from './AchivementBar';
import Link from 'next/link';

const Welcometo = () => {
  const words = [
    { text: 'Shemford' },
    { text: 'Futuristic' },
    { text: 'School' },
    { text: 'Patna', className: 'text-orange-500 dark:text-orange-500' },
  ];

  return (
    <div className="flex flex-col w-full md:flex-row items-center justify-between gap-10 p-6 py-10">
      {/* Left Side: Text */}
      <div className="flex flex-col space-y-5 w-full md:w-1/2">
        <TypewriterEffectSmooth words={words} />

        <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          At Shemford Futuristic School, we believe that the purpose of education
          extends far beyond examinations — it is the deliberate cultivation of
          character, curiosity, and capability. Rooted in the CBSE framework and
          enriched by the proprietary{' '}
          <span className="font-semibold text-orange-500">ShemEduMAX™</span>{' '}
          system, every child who walks through our doors is prepared not just
          for a board result, but for life.
        </p>

        <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
          We have integrated a School Integrated Programme featuring
          pre-foundation and foundation tracks for IIT-JEE and NEET from the
          very first years of secondary schooling. Alongside rigorous academics,
          our students thrive in world-class sports infrastructure, performing
          arts, coding labs, and student-led clubs — because at Shemford,
          excellence is holistic.
        </p>

        <AchievementsSection />

        <Link href="/about">
          <button className="mt-2 px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold shadow hover:shadow-xl hover:bg-orange-600 transition-all w-fit">
            Discover Our Story →
          </button>
        </Link>
      </div>

      {/* Right Side: Image */}
      <div className="w-full md:w-1/2">
        <Image
          width={600}
          height={500}
          src="/assets/MainBG.jpg"
          alt="Shemford Futuristic School campus"
          className="w-full h-auto object-cover rounded-2xl shadow-xl"
        />
      </div>
    </div>
  );
};

export default Welcometo;
