import Image from "next/image";
import React from "react";
import AchievementsSection from "./AchivementBar";
import Link from "next/link";

const Welcometo = () => {
  return (
    <div className="flex flex-col w-full md:flex-row items-center gap-12 lg:gap-16">

      {/* ── Left: Text ── */}
      <div className="flex flex-col gap-6 w-full md:w-1/2">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-orange-600">
            Welcome to
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2 leading-tight">
            Shemford Futuristic School,{" "}
            <span className="text-orange-600">Patna</span>
          </h2>
          <span className="section-accent" />
        </div>

        <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          At Shemford Futuristic School, we believe that the purpose of
          education extends far beyond examinations — it is the deliberate
          cultivation of character, curiosity, and capability. Rooted in the
          CBSE framework and enriched by the proprietary{" "}
          <span className="font-semibold text-orange-600">ShemEduMAX™</span>{" "}
          system, every child who walks through our doors is prepared not just
          for a board result, but for life.
        </p>

        <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed">
          We have integrated a School Integrated Programme featuring
          pre-foundation and foundation tracks for IIT-JEE and NEET from the
          very first years of secondary schooling. Alongside rigorous academics,
          our students thrive in world-class sports infrastructure, performing
          arts, coding labs, and student-led clubs — because at Shemford,
          excellence is holistic.
        </p>

        <AchievementsSection />

        <div>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700
              text-white font-semibold rounded-lg shadow-sm transition-colors text-sm"
          >
            Discover Our Story →
          </Link>
        </div>
      </div>

      {/* ── Right: Image ── */}
      <div className="w-full md:w-1/2">
        <Image
          width={640}
          height={520}
          src="/assets/MainBG.jpg"
          alt="Shemford Futuristic School campus"
          className="w-full h-auto object-cover rounded-2xl shadow-lg"
        />
      </div>
    </div>
  );
};

export default Welcometo;
