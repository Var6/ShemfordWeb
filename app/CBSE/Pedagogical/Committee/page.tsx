import React from 'react';

import { getPageContent } from '@/lib/content/server';
import { Users } from 'lucide-react';

export default async function PedagogicalPlanningCommittee() {
  const { t, list } = await getPageContent('cbseCommittee');
  const committeeMembers = list<{ name: string; designation: string; role: string }>('members');

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">

      {/* Hero */}
      <div className="w-full bg-gradient-to-r from-orange-600 to-amber-500 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/15
            rounded-2xl mb-5 border border-white/20">
            <Users className="w-8 h-8 text-white" />
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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8">

        {/* Intro */}
        <div className="bg-white dark:bg-gray-900 border-2 border-orange-100 dark:border-orange-900/30
          rounded-2xl p-8 shadow-sm">
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm whitespace-pre-line">
            {t('intro')}
          </p>
        </div>

        {/* Committee table */}
        <div className="bg-white dark:bg-gray-900 border-2 border-orange-100 dark:border-orange-900/30
          rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-orange-600 to-amber-500 text-white">
                  <th className="px-6 py-4 text-center text-sm font-bold w-16">S.No.</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Designation</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Role</th>
                </tr>
              </thead>
              <tbody>
                {committeeMembers.map((member, index) => (
                  <tr
                    key={index}
                    className={`border-b border-orange-100 dark:border-orange-900/20 transition-colors
                      ${index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-orange-50/40 dark:bg-orange-900/5'}
                      hover:bg-orange-50 dark:hover:bg-orange-900/10`}
                  >
                    <td className="px-6 py-3 text-center text-sm font-semibold text-orange-600">
                      {index + 1}
                    </td>
                    <td className="px-6 py-3 text-sm font-medium text-gray-800 dark:text-gray-200">
                      {member.name}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-600 dark:text-gray-400">
                      {member.designation}
                    </td>
                    <td className="px-6 py-3 text-sm">
                      {member.role && (
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          member.role === 'Advisor'
                            ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                            : member.role === 'Chairperson'
                            ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                            : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                        }`}>
                          {member.role}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
