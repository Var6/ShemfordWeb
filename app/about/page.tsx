import { Metadata } from 'next';
import { title } from '@/components/primitives';
import { Timeline } from '@/components/ui/timeline';
import { CheckCircle } from 'lucide-react';

import { getPageContent } from '@/lib/content/server';
import { ContentIcon } from '@/lib/content/icons';

export const metadata: Metadata = {
  title: 'About Shemford Futuristic School - Our Story & Mission',
  description:
    'Learn about Shemford Futuristic School in Patna, Bihar. Discover our vision, mission, values, and journey since 2012.',
  keywords: ['about school', 'school mission', 'school vision', 'Shemford school'],
  openGraph: {
    title: 'About Shemford Futuristic School',
    description: 'Discover our journey, values, and commitment to education',
    url: 'https://shemford.edu/about',
    type: 'website',
  },
};

interface ValueCard {
  icon: string;
  title: string;
  desc: string;
}

interface TitledItem {
  title: string;
  desc: string;
}

/* Card accents cycle so any number of value cards stays on-brand. */
const VALUE_ACCENTS = [
  { border: 'border-orange-200 dark:border-orange-900/40', iconBg: 'bg-orange-50 dark:bg-orange-900/20', icon: 'text-orange-600' },
  { border: 'border-amber-200 dark:border-amber-900/40', iconBg: 'bg-amber-50 dark:bg-amber-900/20', icon: 'text-amber-500' },
  { border: 'border-orange-200 dark:border-orange-900/40', iconBg: 'bg-orange-50 dark:bg-orange-900/20', icon: 'text-orange-500' },
];

export default async function About() {
  const { t, list } = await getPageContent('about');

  const coreValues = list<ValueCard>('values');
  const whyChoose = list<TitledItem>('why.items');
  const achievements = list<{ title: string; items: string }>('achievements.groups');
  const timelineItems = list<{ title: string; body: string }>('timeline.items');
  const timelineImages = [
    list<string>('timeline.images1'),
    list<string>('timeline.images2'),
    list<string>('timeline.images3'),
  ];

  const data = timelineItems.map((entry, index) => ({
    title: entry.title,
    content: (
      <div>
        <p className="mb-8 text-sm font-normal text-neutral-700 md:text-base dark:text-neutral-200 leading-relaxed whitespace-pre-line">
          {entry.body}
        </p>
        <div className="grid grid-cols-2 gap-4">
          {(timelineImages[index] ?? []).map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={`${src}-${i}`} src={src} alt={`${entry.title} photo ${i + 1}`}
              className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60" />
          ))}
        </div>
      </div>
    ),
  }));

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">

      {/* Hero */}
      <div className="w-full bg-linear-to-r from-orange-600 to-amber-500 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-100 mb-3">
            {t('hero.eyebrow')}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('hero.title')}</h1>
          <p className="text-orange-100 text-lg max-w-2xl mx-auto leading-relaxed whitespace-pre-line">
            {t('hero.subtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">


        {/* Core Values — 3D hover lift */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {coreValues.map((v, i) => {
            const accent = VALUE_ACCENTS[i % VALUE_ACCENTS.length];

            return (
              <div
                key={i}
                className={`border-2 ${accent.border} rounded-2xl p-6 bg-white dark:bg-gray-900 shadow-xs
                  hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-default group`}
                style={{ perspective: '800px' }}
              >
                <div className={`w-14 h-14 ${accent.iconBg} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <ContentIcon className={`w-8 h-8 ${accent.icon}`} name={v.icon} />
                </div>
                <h3 className="font-bold text-lg text-center mb-2">{v.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center leading-relaxed">
                  {v.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Mission */}
        <div className="mb-14 bg-linear-to-r from-orange-50 to-amber-50 dark:from-orange-900/10 dark:to-amber-900/10 rounded-2xl p-10 border border-orange-100 dark:border-orange-900/30">
          <h2 className="text-3xl font-bold mb-5">{t('mission.title')}</h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed whitespace-pre-line">
            {t('mission.body')}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative w-full overflow-clip mb-14">
          <h2 className="text-3xl font-bold text-center mb-10">{t('timeline.title')}</h2>
          <Timeline data={data} />
        </div>

        {/* Achievements */}
        <div className="mb-14">
          <h2 className="text-3xl font-bold text-center mb-10">{t('achievements.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((ach, i) => (
              <div
                key={i}
                className="border-2 border-orange-100 dark:border-orange-900/30 rounded-2xl p-6 bg-white dark:bg-gray-900 shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <h3 className="font-bold text-lg mb-4 text-orange-600 dark:text-orange-400">
                  {ach.title}
                </h3>
                <ul className="space-y-2">
                  {(ach.items ?? '')
                    .split('\n')
                    .map((line) => line.trim())
                    .filter(Boolean)
                    .map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-gray-700 dark:text-gray-300 text-sm">
                        <CheckCircle className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-linear-to-r from-orange-50 to-amber-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-10 border border-orange-100 dark:border-orange-900/30">
          <h2 className="text-3xl font-bold text-center mb-10">{t('why.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyChoose.map((w, i) => (
              <div
                key={i}
                className="flex items-start gap-4 bg-white dark:bg-gray-800 rounded-xl p-5 shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-orange-400 to-orange-600 flex items-center justify-center shrink-0 shadow-sm">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold mb-1 text-gray-900 dark:text-white">{w.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
