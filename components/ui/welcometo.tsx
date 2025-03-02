// src/components/TextImageSection.tsx
import Image from 'next/image';
import React from 'react';
import { TypewriterEffectSmooth } from '../typewritterEffect';
import AchievementsSection from './AchivementBar';

const Welcometo = () => {
  const words = [
    {
      text: 'Shemford',
    },
    {
      text: 'Futuristic',
    },
    {
      text: 'School',
    },
    {
      text: 'Patna',
      className: 'text-orange-500 dark:text-orange-500',
    },
  ];
  return (
    <div className="flex flex-col w-full md:flex-row items-center justify-between gap-8 p-6">
      {/* Left Side: Text */}
      <div className="flex flex-col space-y-4 w-full md:w-1/2">
        <TypewriterEffectSmooth words={words} />
        Best CBSE School in Patna – Shemford Futuristic School : We Build Future
        Here A Future Choice with Futuristic School! As the word Futuristic
        finds its place in the School’s name we too absolutely believe in the
        futuristic approach and look forward to achieving it in a very holistic
        way.
        <span>
          We have introduced a School Integrated Program with pre-foundation
          andfoundation courses for IIT-JEE and NEET from the current academic
          session. We also aim to introduce sports and extracurricular
          activities as the epicenter of our education programme and promulgate
          in house Sports training facilities with world-class facilities.
        </span>
        <AchievementsSection />
        <button className=" p-3 bg-orange-500 rounded-md w-fit shadow-sm hover:shadow-xl ">
          Know More →{' '}
        </button>
      </div>
      {/* Right Side: Image */}
      <div className="w-full md:w-1/2">
        <Image
          width={500}
          height={500}
          src={'/assets/MainBG.jpg'}
          alt="Descriptive Image"
          className="w-full h-auto object-cover rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default Welcometo;
