"use client";
import { useEffect, useState } from "react";
import { Star, Trophy, GraduationCap, Search, BookOpen } from "lucide-react";

type Topper = {
  _id: string;
  name: string;
  class: string;
  section: string;
  percentage: string;
  rank: number;
  year: string;
  category: "Class Topper" | "CBSE Board";
  subject: string;
  photo: string;
  message: string;
};

const RANK_STYLES: Record<number, { ring: string; badge: string; glow: string; label: string }> = {
  1: { ring: "ring-4 ring-amber-400",  badge: "bg-gradient-to-br from-amber-400 to-yellow-500",  glow: "shadow-amber-100",  label: "1st" },
  2: { ring: "ring-4 ring-slate-400",  badge: "bg-gradient-to-br from-slate-400 to-gray-500",    glow: "shadow-slate-100",  label: "2nd" },
  3: { ring: "ring-4 ring-orange-400", badge: "bg-gradient-to-br from-orange-400 to-amber-600",  glow: "shadow-orange-100", label: "3rd" },
};
const defaultRank = { ring: "ring-2 ring-orange-300", badge: "bg-gradient-to-br from-orange-400 to-amber-500", glow: "shadow-orange-50", label: "Top" };

function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow animate-pulse">
      <div className="w-24 h-28 rounded-2xl bg-gray-200 dark:bg-gray-700 mx-auto mb-4" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto mb-2" />
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto mb-2" />
      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mx-auto" />
    </div>
  );
}

function TopperCard({ t }: { t: Topper }) {
  const rs = RANK_STYLES[t.rank] || defaultRank;
  const isCBSE = t.category === "CBSE Board";

  return (
    <div className={`relative bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-md hover:shadow-xl
      transition-all duration-300 hover:-translate-y-1 flex flex-col items-center text-center ${rs.glow}`}>
      <span className={`absolute top-4 right-4 text-[10px] font-bold px-2 py-0.5 rounded-full text-white ${
        isCBSE ? "bg-orange-600" : "bg-amber-500"
      }`}>
        {isCBSE ? "CBSE Board" : "Class Topper"}
      </span>
      <div className={`absolute top-4 left-4 w-7 h-7 rounded-full ${rs.badge} flex items-center justify-center text-white text-xs font-black shadow`}>
        {rs.label}
      </div>
      <div className={`relative w-24 h-28 rounded-2xl overflow-hidden mb-4 ${rs.ring} shadow-lg`}>
        <img src={t.photo} alt={t.name} className="w-full h-full object-cover object-top" />
      </div>
      <h3 className="text-base font-bold text-gray-900 dark:text-white leading-tight mb-1">{t.name}</h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
        Class {t.class}{t.section ? ` – ${t.section}` : ""}
        {t.subject !== "Overall" && <> · {t.subject}</>}
      </p>
      <div className={`px-4 py-1.5 rounded-xl text-sm font-bold text-white ${rs.badge} shadow`}>
        {t.percentage}
      </div>
      {t.message && (
        <p className="mt-3 text-xs text-gray-400 dark:text-gray-500 italic line-clamp-2">"{t.message}"</p>
      )}
    </div>
  );
}

export default function ToppersPage() {
  const [toppers, setToppers] = useState<Topper[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"All" | "Class Topper" | "CBSE Board">("All");
  const [year, setYear] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("All");

  useEffect(() => {
    fetch("/api/toppers")
      .then(r => r.json())
      .then(data => { setToppers(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const years = ["All", ...Array.from(new Set(toppers.map(t => t.year))).sort().reverse()];
  const classes = ["All", ...Array.from(new Set(toppers.map(t => t.class))).sort((a, b) => Number(a) - Number(b))];

  const filtered = toppers.filter(t => {
    if (tab !== "All" && t.category !== tab) return false;
    if (year !== "All" && t.year !== year) return false;
    if (selectedClass !== "All" && t.class !== selectedClass) return false;
    if (search && !t.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const cbse = filtered.filter(t => t.category === "CBSE Board");
  const classToppers = filtered.filter(t => t.category === "Class Topper");
  const cbse10 = cbse.filter(t => t.class === "10").sort((a, b) => a.rank - b.rank);
  const cbse12 = cbse.filter(t => t.class === "12").sort((a, b) => a.rank - b.rank);
  const classByGrade = classes.filter(c => c !== "All").reduce<Record<string, Topper[]>>((acc, c) => {
    const list = classToppers.filter(t => t.class === c).sort((a, b) => a.rank - b.rank);
    if (list.length) acc[c] = list;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">

      {/* ── Hero ── */}
      <div className="w-full bg-gradient-to-r from-orange-600 to-amber-500 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/15
            rounded-2xl mb-5 border border-white/20">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20
            rounded-full text-sm font-medium mb-4">
            <Star className="w-4 h-4 text-amber-300" />
            Hall of Fame
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">Our Toppers</h1>
          <p className="text-orange-100 text-lg max-w-2xl mx-auto">
            Celebrating the brilliance of our students — from class champions to CBSE board toppers who made Shemford proud.
          </p>
          {!loading && toppers.length > 0 && (
            <div className="mt-10 flex flex-wrap justify-center gap-8 text-center">
              {[
                { val: `${toppers.length}+`, label: "Toppers" },
                { val: toppers.filter(t => t.category === "CBSE Board").length, label: "CBSE Board Toppers" },
                { val: new Set(toppers.map(t => t.year)).size, label: "Academic Years" },
              ].map((s, i) => (
                <div key={i}>
                  <div className="text-3xl font-bold text-amber-300">{s.val}</div>
                  <div className="text-orange-100 text-sm mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-4">
        <div className="bg-white dark:bg-gray-900 border-2 border-orange-100 dark:border-orange-900/30
          rounded-2xl shadow-sm p-4 flex flex-wrap gap-3 items-center">

          <div className="flex rounded-xl overflow-hidden border-2 border-orange-100 dark:border-orange-900/40">
            {(["All", "Class Topper", "CBSE Board"] as const).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-4 py-2 text-sm font-semibold transition-colors ${
                  tab === t ? 'bg-orange-600 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900/10'
                }`}>
                {t === "All" ? "All Toppers" : t === "CBSE Board" ? "CBSE Board" : "Class Toppers"}
              </button>
            ))}
          </div>

          <select value={year} onChange={e => setYear(e.target.value)}
            className="border-2 border-orange-100 dark:border-orange-900/40 rounded-xl px-3 py-2 text-sm
              bg-white dark:bg-gray-900 text-gray-900 dark:text-white
              focus:outline-none focus:ring-2 focus:ring-orange-500">
            {years.map(y => <option key={y} value={y}>{y === "All" ? "All Years" : y}</option>)}
          </select>

          {tab !== "CBSE Board" && (
            <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)}
              className="border-2 border-orange-100 dark:border-orange-900/40 rounded-xl px-3 py-2 text-sm
                bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                focus:outline-none focus:ring-2 focus:ring-orange-500">
              {classes.map(c => <option key={c} value={c}>{c === "All" ? "All Classes" : `Class ${c}`}</option>)}
            </select>
          )}

          <div className="ml-auto flex items-center gap-2 border-2 border-orange-100 dark:border-orange-900/40
            rounded-xl px-3 py-2 bg-orange-50 dark:bg-orange-900/10">
            <Search className="w-4 h-4 text-orange-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name…"
              className="bg-transparent text-sm text-gray-700 dark:text-white outline-none w-36 placeholder-gray-400" />
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 bg-orange-50 dark:bg-orange-900/10 rounded-2xl
            border border-orange-100 dark:border-orange-900/30">
            <Trophy className="w-14 h-14 text-orange-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-400 dark:text-gray-500">No toppers found</h3>
            <p className="text-gray-400 mt-1 text-sm">Try changing the filters</p>
          </div>
        ) : (
          <>
            {(tab === "All" || tab === "CBSE Board") && (cbse10.length > 0 || cbse12.length > 0) && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-xl bg-orange-600">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">CBSE Board Toppers</h2>
                  <div className="flex-1 h-px bg-orange-100 dark:bg-orange-900/30" />
                </div>

                {cbse10.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                      <span className="w-7 h-7 rounded-full bg-orange-100 dark:bg-orange-900/30
                        text-orange-700 dark:text-orange-300 flex items-center justify-center text-sm font-black">10</span>
                      Class X – Secondary Board
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                      {cbse10.map(t => <TopperCard key={t._id} t={t} />)}
                    </div>
                  </div>
                )}

                {cbse12.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                      <span className="w-7 h-7 rounded-full bg-orange-100 dark:bg-orange-900/30
                        text-orange-700 dark:text-orange-300 flex items-center justify-center text-sm font-black">12</span>
                      Class XII – Senior Secondary Board
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                      {cbse12.map(t => <TopperCard key={t._id} t={t} />)}
                    </div>
                  </div>
                )}
              </div>
            )}

            {(tab === "All" || tab === "Class Topper") && Object.keys(classByGrade).length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-xl bg-amber-500">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Class Toppers</h2>
                  <div className="flex-1 h-px bg-orange-100 dark:bg-orange-900/30" />
                </div>
                <div className="space-y-10">
                  {Object.entries(classByGrade).map(([cls, list]) => (
                    <div key={cls}>
                      <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30
                          text-amber-700 dark:text-amber-300 flex items-center justify-center text-sm font-black">{cls}</span>
                        Class {cls}
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                        {list.map(t => <TopperCard key={t._id} t={t} />)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
