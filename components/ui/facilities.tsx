"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BookOpen, Monitor, Trophy, Baby, Zap, FlaskConical, ArrowRight,
  ChevronLeft, ChevronRight,
} from "lucide-react";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";

const facilityImages: string[] = [
  "/assets/banner1.jpg",
  "/assets/banner2.jpg",
  "/assets/banner3.jpg",
  "/assets/banner4.jpg",
  "/assets/banner5.jpg",
];

const FACILITIES = [
  {
    icon: <BookOpen className="w-6 h-6" />,
    color: "bg-amber-500",
    lightBg: "bg-amber-50 dark:bg-amber-900/20",
    border: "border-amber-200 dark:border-amber-800",
    glow: "hover:shadow-amber-100 dark:hover:shadow-amber-900/30",
    title: "Library",
    subtitle: "Knowledge Hub",
    desc: "A curated collection spanning 45+ subjects — from classic literature to cutting-edge science.",
    stat: "1,000+ Books",
  },
  {
    icon: <Monitor className="w-6 h-6" />,
    color: "bg-sky-500",
    lightBg: "bg-sky-50 dark:bg-sky-900/20",
    border: "border-sky-200 dark:border-sky-800",
    glow: "hover:shadow-sky-100 dark:hover:shadow-sky-900/30",
    title: "Computer Lab",
    subtitle: "Innovation Centre",
    desc: "High-performance workstations with high-speed internet and interactive projectors.",
    stat: "35+ Workstations",
  },
  {
    icon: <FlaskConical className="w-6 h-6" />,
    color: "bg-emerald-500",
    lightBg: "bg-emerald-50 dark:bg-emerald-900/20",
    border: "border-emerald-200 dark:border-emerald-800",
    glow: "hover:shadow-emerald-100 dark:hover:shadow-emerald-900/30",
    title: "Science Labs",
    subtitle: "Physics · Chemistry · Biology",
    desc: "Fully equipped labs with real apparatus — because experiments beat textbook diagrams every time.",
    stat: "4 Dedicated Labs",
  },
  {
    icon: <Trophy className="w-6 h-6" />,
    color: "bg-orange-500",
    lightBg: "bg-orange-50 dark:bg-orange-900/20",
    border: "border-orange-200 dark:border-orange-800",
    glow: "hover:shadow-orange-100 dark:hover:shadow-orange-900/30",
    title: "Sports Grounds",
    subtitle: "Athletics & Fitness",
    desc: "Basketball, Football, and Cricket — plus a dedicated outdoor play zone for younger students.",
    stat: "3 Play Areas",
  },
  {
    icon: <Baby className="w-6 h-6" />,
    color: "bg-rose-500",
    lightBg: "bg-rose-50 dark:bg-rose-900/20",
    border: "border-rose-200 dark:border-rose-800",
    glow: "hover:shadow-rose-100 dark:hover:shadow-rose-900/30",
    title: "Kindergarten Wing",
    subtitle: "Early Childhood",
    desc: "Warm, safe, and stimulating — sensory rooms and age-appropriate play designed to spark wonder.",
    stat: "Dedicated Wing",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    color: "bg-violet-500",
    lightBg: "bg-violet-50 dark:bg-violet-900/20",
    border: "border-violet-200 dark:border-violet-800",
    glow: "hover:shadow-violet-100 dark:hover:shadow-violet-900/30",
    title: "Smart Classrooms",
    subtitle: "Clubs & Co-curricular",
    desc: "Interactive smart boards, Chess, Table Tennis, and activity rooms for every interest.",
    stat: "Smart Boards",
  },
];

/* ── Slim carousel ── */
function FacilityCarousel() {
  const [idx, setIdx] = useState(0);
  const total = facilityImages.length;
  const prev = () => setIdx((i) => (i === 0 ? total - 1 : i - 1));
  const next = () => setIdx((i) => (i + 1) % total);

  useEffect(() => {
    const t = setInterval(next, 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl group">
      {facilityImages.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`Facility ${i + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            i === idx ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white
          text-gray-800 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white
          text-gray-800 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {facilityImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === idx ? "w-5 bg-white" : "w-1.5 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

const Facilities = () => (
  <div className="flex flex-col w-full gap-14">

    {/* ── Header ── */}
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
      <div>
        <span className="text-xs font-bold uppercase tracking-[0.22em] text-orange-600">
          Infrastructure
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2">
          World-Class Facilities
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-lg">
          Every space at Shemford is designed with one purpose — to help each
          child discover, explore, and excel.
        </p>
      </div>
      <Link
        href="/Campus"
        className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600
          hover:text-orange-700 transition-colors whitespace-nowrap group"
      >
        Explore Campus
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>

    {/* ── 3D Card grid ── */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {FACILITIES.map((f, i) => (
        <CardContainer key={i} containerClassName="w-full">
          <CardBody className={`${f.lightBg} border-2 ${f.border} rounded-2xl p-6 flex flex-col gap-4 cursor-default w-full shadow-md ${f.glow} hover:shadow-xl transition-shadow duration-300`}>

            {/* Icon + stat — lifted toward viewer */}
            <CardItem translateZ={50} className="w-full flex items-start justify-between">
              <div className={`${f.color} text-white w-11 h-11 rounded-xl flex items-center justify-center shadow-md`}>
                {f.icon}
              </div>
              <span className="text-xs font-bold text-gray-400 dark:text-gray-500 bg-white dark:bg-gray-800
                border border-gray-200 dark:border-gray-700 rounded-full px-3 py-1">
                {f.stat}
              </span>
            </CardItem>

            {/* Title — floats a bit */}
            <CardItem translateZ={60} className="w-full">
              <p className="font-bold text-gray-900 dark:text-white text-base">{f.title}</p>
              <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 mt-0.5">{f.subtitle}</p>
            </CardItem>

            {/* Description — base level */}
            <CardItem translateZ={30} className="w-full">
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{f.desc}</p>
            </CardItem>

          </CardBody>
        </CardContainer>
      ))}
    </div>

    {/* ── Carousel + copy ── */}
    <div className="flex flex-col lg:flex-row gap-10 items-center">
      <div className="w-full lg:w-3/5">
        <FacilityCarousel />
      </div>
      <div className="w-full lg:w-2/5 flex flex-col gap-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white leading-snug">
          A Campus Built for <span className="text-orange-600">Curiosity</span>
        </h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          From the moment a child steps onto our campus, every corner is an
          invitation to learn. Our infrastructure is regularly upgraded so
          students always work with the best tools available.
        </p>
        <ul className="space-y-2">
          {[
            "Smart boards in every classroom",
            "Purified drinking water throughout",
            "CCTV-monitored, fully secured campus",
            "Separate wings for primary & secondary",
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <Link
          href="/Campus"
          className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700
            text-white font-semibold rounded-xl shadow-sm transition-colors text-sm w-fit"
        >
          View Full Campus <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>

  </div>
);

export default Facilities;
