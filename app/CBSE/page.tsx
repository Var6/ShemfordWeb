import Link from 'next/link';
import { BookOpen, Info, GraduationCap } from 'lucide-react';

const cbseLinks = [
  {
    text: 'Mandatory Disclosure',
    href: '/CBSE/Disclouser',
    icon: BookOpen,
    desc: 'View all mandatory CBSE disclosures as required by the board.',
  },
  {
    text: 'School Information',
    href: '/CBSE/Information',
    icon: Info,
    desc: 'Detailed information about the school, affiliations, and infrastructure.',
  },
  {
    text: 'Pedagogical Information',
    href: '/CBSE/Pedagogical',
    icon: GraduationCap,
    desc: 'Teaching methodology, curriculum, and pedagogical committee details.',
  },
];

export default function CBSE() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">

      {/* ── Hero ── */}
      <div className="w-full bg-gradient-to-r from-orange-600 to-amber-500 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/15
            rounded-2xl mb-5 border border-white/20">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-100 mb-3">
            Shemford Futuristic School
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">CBSE Compliance</h1>
          <p className="text-orange-100 text-lg max-w-xl mx-auto">
            Transparent disclosures and school information as required by the
            Central Board of Secondary Education.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cbseLinks.map(({ text, href, icon: Icon, desc }) => (
            <Link
              key={href}
              href={href}
              className="group bg-white dark:bg-gray-900 border-2 border-orange-100
                dark:border-orange-900/30 rounded-2xl p-8 shadow-sm hover:shadow-xl
                hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center gap-4"
            >
              <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/20 rounded-2xl
                flex items-center justify-center group-hover:bg-orange-600 transition-colors">
                <Icon className="w-7 h-7 text-orange-600 group-hover:text-white transition-colors" />
              </div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white
                group-hover:text-orange-600 transition-colors">{text}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
