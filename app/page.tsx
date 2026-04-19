"use client";

import { useEffect, useState } from "react";
import Carousel from "@/components/carousel";
import Facilities from "@/components/ui/facilities";
import Welcometo from "@/components/ui/welcometo";
import Whyshemford from "@/components/ui/whyshemford";
import HolidayRibbon from "@/components/notificationribbon";
import { Button } from "@heroui/button";
import Link from "next/link";
import { CheckCircle, Users, Medal, Building2, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

interface Holiday {
  title: string;
  date?: string;
  start?: string;
  end?: string;
  reopen?: string;
}

const educationalQuotes = [
  {
    quote: "Education is not the filling of a pail, but the lighting of a fire.",
    author: "William Butler Yeats",
    role: "Poet & Nobel Laureate",
  },
  {
    quote:
      "The function of education is to teach one to think intensively and to think critically. Intelligence plus character — that is the goal of true education.",
    author: "Dr. Martin Luther King Jr.",
    role: "Civil Rights Leader & Scholar",
  },
  {
    quote: "Tell me and I forget. Teach me and I remember. Involve me and I learn.",
    author: "Benjamin Franklin",
    role: "Founding Father & Philosopher",
  },
];

const statCards = [
  {
    icon: <Building2 className="w-7 h-7 text-orange-400" />,
    value: "15+",
    label: "Modern Facilities",
    desc: "Labs, libraries & smart classrooms",
  },
  {
    icon: <Users className="w-7 h-7 text-orange-400" />,
    value: "500+",
    label: "Active Students",
    desc: "Pre-Primary to Class XII",
  },
  {
    icon: <Medal className="w-7 h-7 text-orange-400" />,
    value: "95%+",
    label: "Board Results",
    desc: "Consistent CBSE excellence",
  },
  {
    icon: <CheckCircle className="w-7 h-7 text-orange-400" />,
    value: "CBSE",
    label: "Affiliated",
    desc: "Nationally recognised curriculum",
  },
];

const images: string[] = [
  "/assets/banner1.jpg",
  "/assets/banner2.jpg",
  "/assets/banner3.jpg",
  "/assets/banner4.jpg",
  "/assets/banner5.jpg",
];

export default function Home() {
  const [holidays, setHolidays]     = useState<Holiday[]>([]);
  const [loading, setLoading]       = useState(true);
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    fetch("/api/calendar")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setHolidays)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const t = setInterval(
      () => setQuoteIndex((i) => (i + 1) % educationalQuotes.length),
      7000,
    );
    return () => clearInterval(t);
  }, []);

  const q = educationalQuotes[quoteIndex];

  return (
    <>
      {/* ── Hero Carousel ── */}
      <div className="relative left-1/2 w-screen max-w-none -translate-x-1/2 overflow-hidden h-screen">
        <Carousel images={images} className="w-full h-full" videoUrl="video1.mp4" />
      </div>

      {/* ── Stats strip — dark full-width band ── */}
      <div className="relative left-1/2 w-screen max-w-none -translate-x-1/2 bg-gray-950">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-800">
            {statCards.map((s, i) => (
              <div key={i} className="flex flex-col items-center text-center px-6 py-8 gap-2">
                {s.icon}
                <span className="text-3xl font-bold text-white">{s.value}</span>
                <span className="text-sm font-semibold text-gray-200">{s.label}</span>
                <span className="text-xs text-gray-500">{s.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Holiday ribbon ── */}
      {!loading && <HolidayRibbon holidays={holidays} />}

      {/* ── Content sections ── */}
      <section className="w-full overflow-hidden">
        <div className="w-full px-4 sm:px-6">

          {/* Welcome / About */}
          <div className="py-16 md:py-20">
            <Welcometo />
          </div>

          <div className="h-px bg-gray-100 dark:bg-gray-800" />

          {/* Facilities */}
          <div className="py-16 md:py-20">
            <Facilities />
          </div>

          <div className="h-px bg-gray-100 dark:bg-gray-800" />

          {/* Why Shemford */}
          <div className="py-16 md:py-20">
            <Whyshemford />
          </div>

          <div className="h-px bg-gray-100 dark:bg-gray-800" />

          {/* ── Quote section ── */}
          <div className="py-16 md:py-20">
            <div className="max-w-3xl mx-auto text-center px-4">
              <div className="flex items-center justify-center gap-2 mb-6">
                <BookOpen className="w-5 h-5 text-orange-600" />
                <span className="text-xs font-bold uppercase tracking-[0.22em] text-orange-600">
                  Words That Inspire
                </span>
                <BookOpen className="w-5 h-5 text-orange-600" />
              </div>

              <motion.blockquote
                key={quoteIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-2xl md:text-3xl font-serif italic text-gray-800 dark:text-gray-100 leading-relaxed"
              >
                &ldquo;{q.quote}&rdquo;
              </motion.blockquote>

              <motion.div
                key={`attr-${quoteIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-6 flex flex-col items-center gap-1"
              >
                <div className="h-px w-10 bg-orange-500 mb-3" />
                <p className="font-semibold text-gray-900 dark:text-white">{q.author}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{q.role}</p>
              </motion.div>

              <div className="flex items-center justify-center gap-2 mt-6">
                {educationalQuotes.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setQuoteIndex(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === quoteIndex
                        ? "w-6 bg-orange-600"
                        : "w-2 bg-gray-300 dark:bg-gray-600 hover:bg-orange-400"
                    }`}
                    aria-label={`Quote ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="h-px bg-gray-100 dark:bg-gray-800" />

          {/* ── Admissions CTA ── */}
          <div className="py-16 md:py-20">
            <div className="rounded-2xl bg-gray-950 px-8 md:px-16 py-14 text-center">
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-orange-500">
                Academic Year 2025–26
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4">
                Admissions Now Open
              </h2>
              <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                Secure your child's place at Patna's most forward-thinking CBSE school.
                Limited seats available — apply early.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-8 shadow-md transition-colors"
                  >
                    Apply Now
                  </Button>
                </Link>
                <Link href="/admission">
                  <Button
                    size="lg"
                    variant="bordered"
                    className="border-gray-600 text-gray-300 hover:border-orange-500 hover:text-orange-400 transition-colors"
                  >
                    Admission Guide
                  </Button>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
