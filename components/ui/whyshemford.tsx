import Image from "next/image";
import React from "react";
import { ContainerScroll } from "@/components/scrollAnimation";

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
    <div className="flex flex-col gap-16">

      {/* ── ShemEduMAX section ── */}
      <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-16">

        {/* Text */}
        <div className="flex flex-col gap-6 w-full md:w-1/2">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-orange-600">
              Best CBSE School in Patna
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2">
              ShemEduMAX™
            </h2>
            <span className="section-accent" />
          </div>

          <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
            Designed by award-winning educationists,{" "}
            <span className="font-semibold text-orange-600">ShemEduMAX™</span>{" "}
            is our proprietary learning system — the result of years of rigorous
            research and real-world classroom experience. It breathes life and
            purpose into every lesson.
          </p>
          <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed">
            ShemEduMAX™ equips students with the knowledge, skills, and
            emotional resilience to navigate the complex demands of modern
            society — not merely as performers, but as thoughtful, responsible
            individuals who lead with integrity.
          </p>
        </div>

        {/* Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src="/Whyus.png"
            width={500}
            height={500}
            alt="ShemEduMAX framework"
            className="rounded-2xl shadow-lg w-full max-w-md"
          />
        </div>
      </div>

      {/* ── 3D scroll card + pillars ── */}
      <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-16">

        {/* ContainerScroll */}
        <div className="w-full md:w-1/2">
          <ContainerScroll
            titleComponent={
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white text-center">
                Why Choose{" "}
                <span className="text-orange-600">Shemford</span>{" "}
                Futuristic School?
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

        {/* Pillars */}
        <div className="w-full md:w-1/2 grid grid-cols-1 gap-5">
          {pillars.map((p, i) => (
            <div key={i} className="flex items-start gap-3 group">
              <div className="mt-1.5 w-2 h-2 rounded-full bg-orange-500 shrink-0 group-hover:scale-150 transition-transform" />
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-100">{p.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Whyshemford;
