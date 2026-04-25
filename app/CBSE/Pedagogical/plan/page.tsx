import React from 'react';
import { GraduationCap } from 'lucide-react';

const sections = [
  {
    title: 'Pedagogical Approach',
    content: `Pedagogy is the manner in which a teacher teaches her/his learners to acquire certain competencies as stated by the outcomes of learning. There are several pedagogical approaches, but in accordance with the NCF 2005, we follow the constructivist approach (CBSE Vide circular Acad 15/2019 dated 9th March 2019). According to this approach, the child is placed at the centre of learning and the approach believes that children learn best through experiencing and reflecting on the topics/concepts being taught.`,
  },
  {
    title: 'Pedagogical Objectives',
    items: [
      'To provide a joyful and stress-free teaching-learning environment.',
      'To promote the all-round development of students with a holistic approach, integrating co-curricular and extra-curricular activities.',
      'To provide quality education that promotes intellectual, social, and cultural vivacity among its learners.',
      'To adapt and innovate methods to achieve academic excellence based on psychological, pedagogical, and social principles.',
      'To generate complete learning outcomes.',
      'To shape the character and behavior of the students.',
    ],
  },
  {
    title: 'Language Development Objectives',
    items: [
      'Develop the ability to speak fluently and accurately in a variety of situations.',
      'Develop multilingual competence through using multilingualism as a strategy for learning languages and subjects.',
      'Develop grammatical competencies, moving from procedural knowledge to declarative knowledge.',
      'Develop the ability to express thoughts effortlessly, confidently, and in an organized manner.',
      'Use language as a skill for real-life purposes.',
    ],
  },
  {
    title: 'Listening and Comprehension Objectives',
    items: [
      'Comprehend audio/video scripts, read aloud texts, and answer comprehension and inferential questions.',
      'Use resources like news, films, songs, dramas, role-play, and internet talks to improve listening comprehension.',
      'Meet people, discuss a variety of issues, organize, and participate in discussions.',
      'Consult dictionaries, magazines, periodicals, thesaurus, encyclopedia, electronic media, and libraries.',
      'Read and narrate stories, describe incidents with fluency and sequence.',
    ],
  },
  {
    title: 'Scientific Approach Objectives',
    items: [
      'Develop understanding of concepts, principles, theories, and laws governing the physical world.',
      'Acquire and use methods of science such as observing, questioning, planning investigations, hypothesizing, collecting, analyzing, and interpreting data.',
      'Conduct experiments, including quantitative measurements.',
      'Appreciate how scientific concepts evolve over time.',
      'Develop scientific temper including objectivity, critical thinking, and freedom from fear and prejudice.',
    ],
  },
  {
    title: 'Social Science Objectives',
    items: [
      'Classify and compare cause and effect relationships in social and natural processes.',
      'Understand concepts like unity in diversity, democracy, development, and the forces enriching our cultural heritage.',
      'Demonstrate skills in observation, enquiry, reflection, empathy, and critical thinking.',
      'Create awareness of environmental issues, sustainable development, gender disparities, and marginalized sections of society.',
      'Understand astronomical phenomena, atmosphere, and biosphere.',
    ],
  },
  {
    title: 'Geography Objectives',
    items: [
      'Observe the political map of India, study states, UTs, and important political terms.',
      'Analyze different types of climates in various regions and the factors affecting the course of a river.',
      'Use diagrams, models, and audio-visual materials to understand earth motions, stars, planets, and moons.',
      'Understand the causes and effects of various revolutions and read maps to identify historical places.',
      'Discuss concepts of democracy, equality, and state governance.',
    ],
  },
];

export default function PedagogicalPlans() {
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
            CBSE Compliance
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Pedagogical Plan</h1>
          <p className="text-orange-100 text-lg max-w-xl mx-auto">
            Annual Pedagogical Plan 2023–24 · Shemford Futuristic School Patna
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
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                {section.content}
              </p>
            ) : (
              <ul className="space-y-2">
                {section.items?.map((item, j) => (
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
