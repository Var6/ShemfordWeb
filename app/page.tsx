"use client";

import { useEffect, useRef, useState } from "react";
import Carousel from "@/components/carousel";
import Facilities from "@/components/ui/facilities";
import Welcometo from "@/components/ui/welcometo";
import Whyshemford from "@/components/ui/whyshemford";
import HolidayRibbon from "@/components/notificationribbon";
import { Button } from "@heroui/button";
import Link from "next/link";
import { CheckCircle, Users, Medal, Building2, BookOpen, Bell, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { CardSpotlight } from "@/components/ui/card-spotlight";

interface Holiday {
  title: string;
  date?: string;
  start?: string;
  end?: string;
  reopen?: string;
}

interface Notice {
  _id?: string;
  title: string;
  description?: string;
  category?: string;
  priority?: "high" | "medium" | "low";
  date?: string;
  createdAt?: string;
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
    icon: <Building2 className="w-6 h-6" />,
    value: "15+",
    label: "Modern Facilities",
    desc: "Labs, libraries & smart classrooms",
  },
  {
    icon: <Users className="w-6 h-6" />,
    value: "500+",
    label: "Active Students",
    desc: "Pre-Primary to Class XII",
  },
  {
    icon: <Medal className="w-6 h-6" />,
    value: "95%+",
    label: "Board Results",
    desc: "Consistent CBSE excellence",
  },
  {
    icon: <CheckCircle className="w-6 h-6" />,
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

/* ── Scrolling Notice Board ── */
function NoticeBoard({ notices }: { notices: Notice[] }) {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = listRef.current;
    if (!el || notices.length < 4) return;
    let frame: number;
    let pos = 0;
    const speed = 0.6; // px per frame

    const tick = () => {
      pos += speed;
      if (pos >= el.scrollHeight / 2) pos = 0;
      el.scrollTop = pos;
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    const pause  = () => cancelAnimationFrame(frame);
    const resume = () => { frame = requestAnimationFrame(tick); };
    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);

    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
    };
  }, [notices]);

  const priorityDot = (p?: string) => {
    if (p === "high") return "bg-red-500";
    if (p === "low")  return "bg-green-500";
    return "bg-amber-400";
  };

  /* duplicate list so scroll loops seamlessly */
  const items = notices.length >= 4 ? [...notices, ...notices] : notices;

  return (
    <div className="relative left-1/2 w-screen max-w-none -translate-x-1/2
      bg-gradient-to-r from-orange-600 to-amber-500">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row gap-6 md:gap-10">

          {/* Label */}
          <div className="flex-shrink-0 flex flex-col justify-center items-center md:items-start gap-2 md:w-44">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-white animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-orange-100">
                Notice Board
              </span>
            </div>
            <p className="text-2xl font-bold text-white leading-tight hidden md:block">
              Latest<br />Notices
            </p>
            <Link href="/Announcement">
              <span className="inline-flex items-center gap-1 text-xs text-orange-100 hover:text-white transition-colors mt-1">
                View all <ExternalLink className="w-3 h-3" />
              </span>
            </Link>
          </div>

          {/* Scrolling list */}
          <div className="flex-1 relative">
            {/* top/bottom fade */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-6 z-10
              bg-gradient-to-b from-orange-600 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 z-10
              bg-gradient-to-t from-amber-500 to-transparent" />

            <ul
              ref={listRef}
              className="overflow-hidden h-40 space-y-1 pr-2"
              style={{ scrollbarWidth: "none" }}
            >
              {items.map((n, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 py-2 border-b border-white/10 last:border-0"
                >
                  <span className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${priorityDot(n.priority)}`} />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white leading-snug truncate">
                      {n.title}
                    </p>
                    {n.description && (
                      <p className="text-xs text-orange-100 mt-0.5 line-clamp-1">
                        {n.description}
                      </p>
                    )}
                  </div>
                  {n.category && (
                    <span className="ml-auto flex-shrink-0 text-[10px] font-semibold uppercase
                      tracking-wide bg-white/15 text-white px-2 py-0.5 rounded-full">
                      {n.category}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [holidays, setHolidays]     = useState<Holiday[]>([]);
  const [loading, setLoading]       = useState(true);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [notices, setNotices]       = useState<Notice[]>([]);

  useEffect(() => {
    fetch("/api/calendar")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setHolidays)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetch("/api/announcements")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => setNotices(Array.isArray(data) ? data : data.announcements ?? []))
      .catch(() => {});
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
        <Carousel
          images={images}
          className="w-full h-full"
          videoUrl="https://res.cloudinary.com/doef42j0e/video/upload/q_auto,f_auto/shemford_hero"
          videoFirst
        />
      </div>

      {/* ── Stats — Aceternity spotlight cards ── */}
      <div className="relative left-1/2 w-screen max-w-none -translate-x-1/2 bg-white dark:bg-gray-950 border-b border-orange-100 dark:border-orange-900/30">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {statCards.map((s, i) => (
              <CardSpotlight key={i} className="p-6 group cursor-default">
                <div className="flex flex-col items-center text-center gap-3 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/20
                    flex items-center justify-center group-hover:bg-orange-600 transition-colors duration-300">
                    <span className="text-orange-600 group-hover:text-white transition-colors duration-300">
                      {s.icon}
                    </span>
                  </div>
                  <span className="text-3xl font-extrabold text-orange-600 dark:text-orange-400">{s.value}</span>
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{s.label}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.desc}</p>
                  </div>
                </div>
              </CardSpotlight>
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

        </div>
      </section>

      {/* ── Notice Board (full-width, between Facilities & Why) ── */}
      {notices.length > 0 && <NoticeBoard notices={notices} />}

      <section className="w-full overflow-hidden">
        <div className="w-full px-4 sm:px-6">

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
            <div className="rounded-2xl bg-gradient-to-r from-orange-600 to-amber-500
              px-8 md:px-16 py-14 text-center shadow-xl">
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-orange-100">
                Academic Year 2025–26
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4">
                Admissions Now Open
              </h2>
              <p className="text-orange-100 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                Secure your child's place at Patna's most forward-thinking CBSE school.
                Limited seats available — apply early.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 shadow-md transition-colors"
                  >
                    Apply Now
                  </Button>
                </Link>
                <Link href="/admission">
                  <Button
                    size="lg"
                    variant="bordered"
                    className="border-white/50 text-white hover:border-white hover:bg-white/10 transition-colors"
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
