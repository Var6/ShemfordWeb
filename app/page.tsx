"use client";

import { useEffect, useState } from "react";
import Carousel from "@/components/carousel";
import Facilities from "@/components/ui/facilities";
import Welcometo from "@/components/ui/welcometo";
import Whyshemford from "@/components/ui/whyshemford";
import { Divider } from "@heroui/divider";
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
    quote: "The function of education is to teach one to think intensively and to think critically. Intelligence plus character — that is the goal of true education.",
    author: "Dr. Martin Luther King Jr.",
    role: "Civil Rights Leader & Scholar",
  },
  {
    quote: "Tell me and I forget. Teach me and I remember. Involve me and I learn.",
    author: "Benjamin Franklin",
    role: "Founding Father & Philosopher",
  },
];

const fadeVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const statCards = [
  {
    icon: <Building2 className="w-8 h-8 text-orange-500" />,
    value: "15+",
    label: "Modern Facilities",
    desc: "Labs, libraries & smart classrooms",
  },
  {
    icon: <Users className="w-8 h-8 text-green-500" />,
    value: "500+",
    label: "Active Students",
    desc: "Across Pre-Primary to Class XII",
  },
  {
    icon: <Medal className="w-8 h-8 text-yellow-500" />,
    value: "95%+",
    label: "Board Results",
    desc: "Consistent CBSE excellence",
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-blue-500" />,
    value: "CBSE",
    label: "Affiliated",
    desc: "Nationally recognised curriculum",
  },
];

export default function Home() {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState(true);
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const res = await fetch("/api/calendar");
        if (!res.ok) throw new Error("Failed to fetch calendar");
        const data = await res.json();
        setHolidays(data);
      } catch (err) {
        console.error("Error fetching holidays:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHolidays();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((i) => (i + 1) % educationalQuotes.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const images: string[] = [
    "/assets/banner1.jpg",
    "/assets/banner2.jpg",
    "/assets/banner3.jpg",
    "/assets/banner4.jpg",
    "/assets/banner5.jpg",
  ];

  const q = educationalQuotes[quoteIndex];

  return (
    <>
      {/* Hero Carousel — clean, no overlay */}
      <div className="relative left-1/2 w-screen max-w-none -translate-x-1/2 overflow-hidden">
        <Carousel
          images={images}
          className="w-full h-[100vh] max-h-[100vh]"
          videoUrl="video1.mp4"
        />
      </div>

      <section className="w-full flex flex-col justify-center gap-4 py-0 overflow-hidden">
        {/* Holiday Ribbon */}
        {!loading && <HolidayRibbon holidays={holidays} />}

        <div className="w-full px-4">

          {/* ── Bookish Wisdom Section ── */}
          <div
            className="w-full my-8 rounded-2xl relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, #fffbeb 0%, #fef3c7 35%, #fefce8 70%, #fff7ed 100%)",
              boxShadow:
                "inset 0 0 0 1px rgba(217,119,6,0.18), 0 8px 40px rgba(180,83,9,0.10)",
            }}
          >
            {/* Decorative ruled lines */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.06]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(transparent, transparent 31px, #92400e 31px, #92400e 32px)",
                backgroundSize: "100% 32px",
              }}
            />
            {/* Left spine accent */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-400 via-orange-500 to-amber-400 rounded-l-2xl" />

            <div className="relative px-10 md:px-20 py-14 text-center">
              <div
                className="text-[7rem] leading-none font-serif text-amber-400 opacity-30 absolute top-4 left-8 select-none"
                aria-hidden
              >
                &ldquo;
              </div>

              <div className="flex items-center justify-center gap-3 mb-6">
                <BookOpen className="w-6 h-6 text-amber-600 opacity-70" />
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">
                  Words That Inspire
                </span>
                <BookOpen className="w-6 h-6 text-amber-600 opacity-70" />
              </div>

              <motion.blockquote
                key={quoteIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                className="text-xl md:text-2xl lg:text-3xl font-serif italic text-amber-950 max-w-3xl mx-auto leading-relaxed"
              >
                {q.quote}
              </motion.blockquote>

              <motion.div
                key={`attr-${quoteIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="flex items-center justify-center gap-4 mt-8"
              >
                <div className="h-px w-12 bg-amber-500 opacity-50" />
                <div className="text-center">
                  <p className="font-semibold text-amber-800">{q.author}</p>
                  <p className="text-xs text-amber-600 tracking-wide">{q.role}</p>
                </div>
                <div className="h-px w-12 bg-amber-500 opacity-50" />
              </motion.div>

              {/* Quote selector dots */}
              <div className="flex items-center justify-center gap-2 mt-6">
                {educationalQuotes.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setQuoteIndex(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === quoteIndex
                        ? "w-6 bg-amber-600"
                        : "w-2 bg-amber-300 hover:bg-amber-500"
                    }`}
                    aria-label={`Quote ${i + 1}`}
                  />
                ))}
              </div>

              <div className="mt-8">
                <Link
                  href="/Campus"
                  className="inline-flex items-center gap-2 text-sm font-medium text-amber-700 hover:text-amber-900 transition-colors group"
                >
                  <BookOpen className="w-4 h-4" />
                  <span className="group-hover:underline underline-offset-4">
                    Explore Our Library &amp; Campus →
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* ── Admissions CTA ── */}
          <div className="w-full my-8 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl p-10 shadow-lg">
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-sm font-semibold uppercase tracking-widest mb-2 opacity-80">
                Academic Year 2025–26
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                Admissions Now Open
              </h2>
              <p className="text-lg mb-8 opacity-90">
                Secure your child's place at Patna's most forward-thinking CBSE school.
                Limited seats available — apply early.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-white text-orange-600 font-bold hover:bg-orange-50 shadow-md"
                  >
                    Apply Now
                  </Button>
                </Link>
                <Link href="/admission">
                  <Button
                    size="lg"
                    variant="bordered"
                    className="border-white text-white hover:bg-white/10"
                  >
                    Admission Guide
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* ── Key Statistics ── */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 my-8">
            {statCards.map((s, i) => (
              <motion.div
                key={i}
                variants={fadeVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ scale: 1.04, y: -4 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="border rounded-2xl p-6 bg-white dark:bg-gray-900 shadow-sm cursor-default"
                style={{ perspective: "600px" }}
              >
                <div className="flex flex-col items-center text-center gap-2">
                  {s.icon}
                  <h3 className="text-3xl font-bold">{s.value}</h3>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">{s.label}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Other Sections ── */}
          <Welcometo />
          <Divider orientation="horizontal" className="my-1" />
          <Facilities />
          <Divider orientation="horizontal" className="my-1" />
          <Whyshemford />
          <Divider orientation="horizontal" className="my-1" />

          {/* ── Final CTA ── */}
          <div className="w-full mt-12 py-12 text-center rounded-2xl bg-gradient-to-br from-gray-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 border border-orange-100 dark:border-orange-900/30">
            <p className="text-sm font-semibold uppercase tracking-widest text-orange-500 mb-2">
              Your Future Begins Here
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Enrol?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
              Join a community of curious minds where every child is seen, inspired, and empowered.
            </p>
            <Link href="/contact">
              <Button size="lg" color="primary" className="font-semibold px-10">
                Begin Your Journey
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
