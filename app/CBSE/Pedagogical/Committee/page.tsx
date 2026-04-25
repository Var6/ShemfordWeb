import React from 'react';
import { Users } from 'lucide-react';

const committeeMembers = [
  { name: "Ms. Meera Sinha",           designation: "Chairperson School Management",  role: "Advisor"               },
  { name: "Mr. Savio Pinto",           designation: "Director Academics",              role: "Advisor"               },
  { name: "Ms. Jaisa P J",             designation: "Principal",                       role: "Chairperson"           },
  { name: "Mr. Manish Chandra Pathak", designation: "Teacher Secondary school",        role: "Member"                },
  { name: "Mr. Abhishek Kumar",        designation: "Teacher – Mathematics",           role: "Member"                },
  { name: "Mr. Abhishek Kumar",        designation: "Teacher – Science",               role: "Member"                },
  { name: "Mr. Abhishek Kumar",        designation: "Teacher – Computer",              role: "Member"                },
  { name: "Ms. Leena Sinha",           designation: "Teacher Secondary school",        role: "Member"                },
  { name: "Ms. Vivek Kumar",           designation: "Teacher Secondary school",        role: "Member"                },
  { name: "Ms. Anshu Priya",           designation: "Teacher Secondary school",        role: "Member"                },
  { name: "Mr. Ayush Kumar",           designation: "Teacher Secondary school",        role: "Member"                },
  { name: "Ms. Ruby Priya",            designation: "Teacher Secondary school",        role: "Member"                },
  { name: "Ms. Rachana Jha",           designation: "Teacher Primary school",          role: "Member"                },
  { name: "Ms. Komili Sharma",         designation: "Teacher Primary school",          role: "Member"                },
  { name: "Ms. Preeti Lata",           designation: "Teacher Primary school",          role: "Member"                },
  { name: "Ms. Poonam Sinha",          designation: "Teacher Primary school",          role: "Member"                },
  { name: "Ms. Neetu Kumari",          designation: "Teacher Primary school",          role: "Member"                },
  { name: "Ms. Anushka",               designation: "Teacher Primary school",          role: "Member"                },
  { name: "Ms. Arpana Priya",          designation: "Teacher Nursery school",          role: "Member"                },
  { name: "Ms. Priyanka Sinha",        designation: "Teacher Nursery school",          role: "Member"                },
  { name: "Mr. Manoj Kumar",           designation: "Teacher Physical Education",      role: "Member"                },
  { name: "Ms. Priyanka Kumari",       designation: "Teacher Art and Craft",           role: "Member"                },
  { name: "Ms. Shwet Prity",           designation: "Teacher Music",                   role: "Member"                },
  { name: "Mr. Ashutosh Kumar",        designation: "Teacher Dance",                   role: "Member"                },
  { name: "Ms. Neha Kumari",           designation: "HR Manager and Operation Head",  role: "Meeting & Documentation"},
  { name: "Mr. Mukesh Kumar",          designation: "Librarian",                       role: "Member"                },
  { name: "Mr. Imran Hussain",         designation: "Parent",                          role: "Member"                },
  { name: "Ms. Parveen Baby",          designation: "Parent",                          role: "Member"                },
];

export default function PedagogicalPlanningCommittee() {
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
            CBSE Compliance
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Pedagogical Planning Committee</h1>
          <p className="text-orange-100 text-lg max-w-xl mx-auto">
            Members of the Annual Pedagogical Planning Committee for Academic Year 2024–25.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8">

        {/* Intro */}
        <div className="bg-white dark:bg-gray-900 border-2 border-orange-100 dark:border-orange-900/30
          rounded-2xl p-8 shadow-sm">
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
            An annual plan contains all academic and co-curricular activities to be taken in the specified
            academic year. It is the act of developing a strategy for the upcoming year based on the
            experiences gained from the previous year's performance. Pedagogical planning is undertaken
            after a series of discussions reviewing curricular and co-curricular activities, identifying
            lacunae, analyzing achievement levels, and considering the needs of the learner and society.
            Based on these discussions, the School Management Committee has established the Annual
            Pedagogical Planning Committee to prepare the plan for 2024-25.
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
