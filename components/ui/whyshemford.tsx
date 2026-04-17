import Image from 'next/image';
import React from 'react';
import { ContainerScroll } from '@/components/scrollAnimation';

const pillars = [
  {
    title: "Positive Attitude Towards Learning",
    desc: "We nurture intrinsic motivation so students pursue knowledge for its own joy.",
  },
  {
    title: "Sound Foundation for a Bright Future",
    desc: "Structured progression from concept to mastery across all disciplines.",
  },
  {
    title: "Powerful Communication Skills",
    desc: "Public speaking, writing, and critical thinking built into every grade.",
  },
  {
    title: "Life-Long Learning Mindset",
    desc: "We teach students how to learn — a skill that outlasts every curriculum.",
  },
  {
    title: "Technology Fluency",
    desc: "Digital literacy, coding, and AI awareness woven into daily learning.",
  },
  {
    title: "Global Collaborative Thinking",
    desc: "Team projects, inter-school exchanges, and a world-aware perspective.",
  },
];

const Whyshemford = () => {
  return (
    <div className="flex flex-col items-center justify-between gap-8 p-6">

      {/* Top: ShemEduMAX section */}
      <div className="flex flex-col w-full md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col space-y-5 w-full md:w-1/2">
          <span className="text-sm font-semibold uppercase tracking-widest text-orange-400">
            Best CBSE School in Patna
          </span>

          <div className="text-3xl font-bold text-orange-500">ShemEduMAX™</div>

          <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
            Designed by award-winning educationists,{' '}
            <span className="font-semibold text-orange-500">ShemEduMAX™</span>{' '}
            is our proprietary learning system — the result of years of
            rigorous research and real-world classroom experience. It breathes
            life and purpose into every lesson.
          </p>
          <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
            ShemEduMAX™ equips students with the knowledge, skills, and
            emotional resilience to navigate the complex demands of modern
            society — not merely as performers, but as thoughtful, responsible
            individuals who lead with integrity.
          </p>
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src="/Whyus.png"
            width={500}
            height={500}
            alt="ShemEduMAX framework"
            className="rounded-2xl shadow-lg"
          />
        </div>
      </div>

      {/* Bottom: 3D scroll card + pillars */}
      <div className="w-full">
        <div className="flex flex-col w-full md:flex-row items-center justify-between gap-8">

          {/* ContainerScroll — 3D tilt effect */}
          <div className="flex flex-col space-y-4 w-full md:w-1/2">
            <ContainerScroll
              titleComponent={
                <h2 className="text-2xl md:text-3xl font-semibold text-orange-600 text-center">
                  Why Choose Shemford Futuristic School?
                </h2>
              }
            >
              <Image
                src="/assets/whyshemford.jpg"
                alt="Shemford campus life"
                height={720}
                width={1400}
                className="mx-auto rounded-2xl object-cover h-full object-left-top"
                draggable={false}
              />
            </ContainerScroll>
          </div>

          {/* Pillars list */}
          <div className="w-full md:w-1/2 grid grid-cols-1 gap-4">
            {pillars.map((p, i) => (
              <div
                key={i}
                className="flex items-start gap-3 group"
              >
                <div className="mt-1 w-2 h-2 rounded-full bg-orange-500 flex-shrink-0 group-hover:scale-150 transition-transform" />
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-100 bg-gradient-to-r from-orange-600 to-yellow-500 bg-clip-text text-transparent">
                    {p.title}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Whyshemford;
