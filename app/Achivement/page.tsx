'use client';

import { useEffect, useState, useCallback } from "react";
import { Trophy, Award, Star, Sparkles, X, ChevronRight, ChevronLeft, Medal, Images } from "lucide-react";

type Achievement = {
  _id: string;
  title: string;
  description: string;
  details: string;
  image: string;
  images: string[];
  icon: string;
  gradient: string;
  color: string;
};

const icons: Record<string, any> = { Trophy, Award, Star, Sparkles, Medal };

/* Inline CSS gradients — never purged by Tailwind */
const FALLBACK_CSS = [
  "linear-gradient(135deg,#2563eb,#4338ca)",
  "linear-gradient(135deg,#9333ea,#db2777)",
  "linear-gradient(135deg,#f59e0b,#ea580c)",
  "linear-gradient(135deg,#10b981,#0d9488)",
  "linear-gradient(135deg,#f43f5e,#ec4899)",
  "linear-gradient(135deg,#06b6d4,#2563eb)",
];

/** Returns a CSS gradient string, never a Tailwind class string */
function getGradientCSS(ach: Achievement, idx: number): string {
  const g = ach.gradient || "";
  // If already a CSS gradient (new format), use directly
  if (g.startsWith("linear-gradient")) return g;
  // Old Tailwind-class-based values or empty → use fallback by index
  return FALLBACK_CSS[idx % FALLBACK_CSS.length];
}

function getPhotos(ach: Achievement): string[] {
  return [ach.image, ...(ach.images || [])].filter(Boolean);
}

/* ── Skeleton ── */
function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg animate-pulse">
      <div className="h-56 bg-gray-200 dark:bg-gray-700" />
      <div className="p-6 space-y-3">
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-xl mt-4" />
      </div>
    </div>
  );
}

/* ── Card carousel ── */
function CardCarousel({ photos, gradientCSS }: { photos: string[]; gradientCSS: string }) {
  const [idx, setIdx] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const prev = (e: React.MouseEvent) => { e.stopPropagation(); setLoaded(false); setIdx((i) => (i - 1 + photos.length) % photos.length); };
  const next = (e: React.MouseEvent) => { e.stopPropagation(); setLoaded(false); setIdx((i) => (i + 1) % photos.length); };

  if (photos.length === 0) {
    return (
      <div className="h-56 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800">
        <Trophy className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-2" />
        <span className="text-xs text-gray-400 font-medium">No image</span>
      </div>
    );
  }

  return (
    <div className="relative h-56 overflow-hidden bg-gray-100 dark:bg-gray-800 group/car">
      {!loaded && <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />}
      <img
        key={photos[idx]}
        src={photos[idx]}
        alt=""
        className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
      />

      {photos.length > 1 && (
        <>
          <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1 opacity-0 group-hover/car:opacity-100 transition-opacity z-10">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1 opacity-0 group-hover/car:opacity-100 transition-opacity z-10">
            <ChevronRight className="w-4 h-4" />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
            {photos.map((_, i) => (
              <button key={i} onClick={(e) => { e.stopPropagation(); setLoaded(false); setIdx(i); }}
                className={`rounded-full transition-all duration-300 ${i === idx ? 'w-4 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/60'}`} />
            ))}
          </div>
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full z-10">
            <Images className="w-3 h-3" /> {photos.length}
          </div>
        </>
      )}
    </div>
  );
}

/* ── Modal gallery ── */
function ModalGallery({ photos, gradientCSS }: { photos: string[]; gradientCSS: string }) {
  const [idx, setIdx] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const prev = useCallback(() => { setLoaded(false); setIdx((i) => (i - 1 + photos.length) % photos.length); }, [photos.length]);
  const next = useCallback(() => { setLoaded(false); setIdx((i) => (i + 1) % photos.length); }, [photos.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'ArrowLeft') prev(); if (e.key === 'ArrowRight') next(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next]);

  if (photos.length === 0) {
    return <div className="h-64 flex items-center justify-center bg-gray-800"><Trophy className="w-16 h-16 text-gray-600" /></div>;
  }

  return (
    <div className="flex-shrink-0">
      <div className="relative w-full h-64 bg-black overflow-hidden">
        {!loaded && <div className="absolute inset-0 bg-gray-800 animate-pulse" />}
        <img
          key={photos[idx]}
          src={photos[idx]}
          alt=""
          className={`w-full h-full object-contain transition-opacity duration-400 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
        />
        {photos.length > 1 && (
          <>
            <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 z-10">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 z-10">
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full z-10">
              {idx + 1} / {photos.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {photos.length > 1 && (
        <div className="flex gap-2 p-2 bg-gray-900 overflow-x-auto no-visible-scrollbar">
          {photos.map((url, i) => (
            <button key={i} onClick={() => { setLoaded(false); setIdx(i); }}
              className={`flex-shrink-0 w-14 h-10 rounded overflow-hidden border-2 transition-all ${i === idx ? 'border-white scale-105' : 'border-transparent opacity-50 hover:opacity-100'}`}>
              <img src={url} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Page ── */
export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [selected, setSelected] = useState<Achievement | null>(null);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/achievements")
      .then((r) => r.json())
      .then((data) => { setAchievements(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelected(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  function openModal(ach: Achievement, idx: number) {
    setSelected(ach);
    setSelectedIdx(idx);
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">

      {/* ── Hero — no top padding so it sits flush under navbar ── */}
      <section className="w-full bg-gradient-to-r from-orange-600 to-amber-500 pb-16 pt-20 px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/15
            rounded-2xl mb-5 border border-white/20">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20
            rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4 text-amber-300" />
            Excellence &amp; Recognition
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">Our Achievements</h1>
          <p className="text-lg text-orange-100 max-w-2xl mx-auto leading-relaxed">
            Celebrating the milestones, honors, and recognitions that reflect our commitment
            to academic excellence and holistic development.
          </p>
          {!loading && achievements.length > 0 && (
            <div className="mt-10 flex flex-wrap justify-center gap-8 text-center">
              {[
                { val: `${achievements.length}+`, label: "Achievements" },
                { val: "250+", label: "Partner Schools" },
                { val: "15+", label: "Years of Excellence" },
              ].map((s, i) => (
                <div key={i}>
                  <div className="text-3xl font-bold text-amber-300">{s.val}</div>
                  <div className="text-orange-100 text-sm mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Cards ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1,2,3].map((i) => <SkeletonCard key={i} />)}
          </div>
        ) : achievements.length === 0 ? (
          <div className="text-center py-24">
            <Trophy className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-400 dark:text-gray-500">No achievements yet</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((ach, idx) => {
              const IconComponent = icons[ach.icon] || Trophy;
              const gradientCSS = getGradientCSS(ach, idx);
              const photos = getPhotos(ach);
              return (
                <div
                  key={ach._id}
                  onClick={() => openModal(ach, idx)}
                  className="group bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col cursor-pointer"
                >
                  {/* carousel — stopPropagation so arrows don't open modal */}
                  <div className="relative" onClick={(e) => e.stopPropagation()}>
                    <CardCarousel photos={photos} gradientCSS={gradientCSS} />
                    <div className="absolute top-4 left-4 p-2.5 rounded-xl shadow-lg z-10" style={{ background: gradientCSS }}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* content */}
                  <div className="flex flex-col flex-1 p-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                      {ach.title}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-3 flex-1">
                      {ach.description}
                    </p>

                    {/* Read More — inline style so it's ALWAYS visible */}
                    <div
                      className="mt-5 w-full flex items-center justify-center gap-2 px-5 py-3 text-white text-sm font-bold rounded-xl shadow-md group-hover:shadow-lg group-hover:scale-[1.02] transition-all duration-200"
                      style={{ background: gradientCSS }}
                    >
                      Read More <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ── Modal ── */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={(e) => e.target === e.currentTarget && setSelected(null)}
        >
          <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[92vh] overflow-hidden flex flex-col">

            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 z-30 p-2 bg-black/50 hover:bg-black/70 backdrop-blur rounded-full transition"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* key forces remount when selected changes → gallery resets to photo 0 */}
            <ModalGallery
              key={selected._id}
              photos={getPhotos(selected)}
              gradientCSS={getGradientCSS(selected, selectedIdx)}
            />

            <div className="overflow-y-auto flex-1 p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-2xl shadow-md flex-shrink-0" style={{ background: getGradientCSS(selected, selectedIdx) }}>
                  {(() => { const I = icons[selected.icon] || Trophy; return <I className="w-6 h-6 text-white" />; })()}
                </div>
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white leading-tight">
                  {selected.title}
                </h2>
              </div>
              <p className="text-orange-600 dark:text-orange-400 font-semibold text-base mb-3">
                {selected.description}
              </p>
              <div className="w-12 h-1 rounded-full mb-4" style={{ background: getGradientCSS(selected, selectedIdx) }} />
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-[15px]">
                {selected.details}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
