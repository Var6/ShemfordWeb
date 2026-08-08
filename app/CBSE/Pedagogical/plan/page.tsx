import React from 'react';

import { getPageContent } from '@/lib/content/server';
import { GraduationCap } from 'lucide-react';

export default async function PedagogicalPlans() {
  const { t, list } = await getPageContent('cbsePlan');
  const sections = list<{ title: string; content: string; items: string }>('sections');

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">

      {/* Hero */}
      <div className="w-full bg-gradient-to-r from-orange-600 to-amber-500 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/15
            rounded-2xl mb-5 border border-white/20">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-100 mb-3">
            {t('hero.eyebrow')}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('hero.title')}</h1>
          <p className="text-orange-100 text-lg max-w-xl mx-auto">
            {t('hero.subtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-6">
        {sections.map((section, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-900 border-2 border-orange-100 dark:border-orange-900/30
              rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-6 bg-orange-500 rounded-full flex-shrink-0" />
              {section.title}
            </h3>
            {section.content ? (
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm whitespace-pre-line">
                {section.content}
              </p>
            ) : (
              <ul className="space-y-2">
                {(section.items ?? '').split('\n').map((l) => l.trim()).filter(Boolean).map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0 mt-1.5" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
